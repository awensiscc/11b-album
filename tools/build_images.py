#!/usr/bin/env python3
"""
Turns full-size photos into sharp, fast-loading website images.

1. Put the original photos (any size, jpg / png / webp) here:

       originals/gallery/<name>.jpg    group photos   (<name> as used in data.js)
       originals/students/<name>.jpg   student portraits
       originals/teacher/teacher.jpg   teacher portrait

2. Run:

       pip install pillow
       python3 tools/build_images.py

For every photo this writes a few widths to photos/<folder>/, so each
visitor downloads only the size their screen needs, plus a small preview
that is shown while the sharp version loads. Everything it made is listed
in images.js, which the site reads.

Originals never go on the website: originals/ is in .gitignore. Camera
data (EXIF, including GPS location) is removed from every output.
"""

import io
import json
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageCms, ImageFilter, ImageOps
except ImportError:
    sys.exit('Pillow is missing - install it with:  pip install pillow')

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'originals'
OUTPUT = ROOT / 'photos'
MANIFEST = ROOT / 'images.js'

# widths (px) made for each folder; never larger than the original
PRESETS = {
    'gallery': {'widths': [640, 1280, 1920, 2560], 'thumb': 216},
    'students': {'widths': [160, 400, 600, 900]},
    'teacher': {'widths': [400, 800, 1200]},
}
QUALITY = 82
# picture shown when the link is shared (1200x630 crop of this gallery photo)
OG_IMAGE = ('gallery', 'photo1', ROOT / 'og-image.jpg')
EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'}
SRGB = ImageCms.createProfile('sRGB')


def load(path):
    """Opens a photo upright, in sRGB colours, without camera data."""
    image = Image.open(path)
    image = ImageOps.exif_transpose(image)
    icc = image.info.get('icc_profile')
    if icc:
        try:
            source_profile = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            image = ImageCms.profileToProfile(image, source_profile, SRGB, outputMode='RGB')
        except (ImageCms.PyCMSError, OSError):
            pass  # broken profile: keep the pixels as they are
    return image.convert('RGB')


def resize(image, width):
    height = round(image.height * width / image.width)
    small = image.resize((width, height), Image.LANCZOS, reducing_gap=3.0)
    # a touch of sharpening brings back crispness lost when shrinking
    if width < image.width * 0.8:
        small = small.filter(ImageFilter.UnsharpMask(radius=0.6, percent=40, threshold=2))
    return small


def save(image, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, 'WEBP', quality=QUALITY, method=6)


def target_widths(original_width, widths):
    """Preset widths up to the original's size (the original's own width if it is smaller)."""
    fitting = [w for w in widths if w < original_width]
    if len(fitting) < len(widths):
        fitting.append(original_width)
    return sorted(set(fitting))


def build(folder, preset):
    sources = sorted(p for p in (SOURCE / folder).glob('*') if p.suffix.lower() in EXTENSIONS)
    for source in sources:
        name = source.stem
        out_dir = OUTPUT / folder
        existing = list(out_dir.glob(f'{name}-*.webp'))
        if existing and min(p.stat().st_mtime for p in existing) > source.stat().st_mtime:
            continue  # already up to date

        image = load(source)
        for old in existing:
            old.unlink()
        widths = target_widths(image.width, preset['widths'])
        for width in widths:
            save(resize(image, width) if width < image.width else image, out_dir / f'{name}-{width}.webp')
        if 'thumb' in preset:
            short = preset['thumb']
            scale = short / min(image.size)
            thumb = image.resize((round(image.width * scale), round(image.height * scale)), Image.LANCZOS, reducing_gap=3.0)
            save(thumb, out_dir / f'{name}-thumb.webp')
        print(f'  {folder}/{name}: {image.width}x{image.height} -> {", ".join(map(str, widths))}')


def build_og_image():
    folder, name, target = OG_IMAGE
    source = next((p for p in (SOURCE / folder).glob(f'{name}.*') if p.suffix.lower() in EXTENSIONS), None)
    if not source or (target.exists() and target.stat().st_mtime > source.stat().st_mtime):
        return
    image = ImageOps.fit(load(source), (1200, 630), Image.LANCZOS)
    image.save(target, 'JPEG', quality=85, optimize=True, progressive=True)
    print(f'  {target.name} from {folder}/{name}')


def write_manifest():
    """Lists every generated photo with its sizes, read from what is on disk."""
    info = {}
    pattern = re.compile(r'^(?P<name>.+)-(?P<width>\d+)\.webp$')
    for folder in sorted(PRESETS):
        found = {}
        for path in sorted((OUTPUT / folder).glob('*.webp')):
            match = pattern.match(path.name)
            if match:
                found.setdefault(match['name'], []).append((int(match['width']), path))
        for name, variants in sorted(found.items()):
            variants.sort()
            with Image.open(variants[-1][1]) as largest:
                ratio = round(largest.width / largest.height, 4)
            entry = {'ratio': ratio, 'widths': [w for w, _ in variants]}
            if (OUTPUT / folder / f'{name}-thumb.webp').exists():
                entry['thumb'] = True
            info[f'{folder}/{name}'] = entry

    lines = ',\n'.join(f'    {json.dumps(key)}: {json.dumps(value)}' for key, value in info.items())
    MANIFEST.write_text(
        '// Generated by tools/build_images.py - do not edit by hand.\n'
        '// Every photo in photos/, with its width/height ratio and the widths available.\n'
        f'const PHOTO_INFO = {{\n{lines}\n}};\n',
        encoding='utf-8',
    )
    print(f'images.js: {len(info)} photos')


def main():
    if not SOURCE.exists():
        sys.exit(f'Put the original photos in {SOURCE}/ first (see the top of this file).')
    for folder, preset in PRESETS.items():
        build(folder, preset)
    build_og_image()
    write_manifest()


if __name__ == '__main__':
    main()
