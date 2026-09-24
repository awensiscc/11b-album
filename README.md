# Web Album Creator

This website was created by me and my friend from scratch, using auxiliary tools such as AI (ChatGPT o1-preview) and thorough research. You can use this website to create web versions of school albums and more.

Live: [11bpics.site](https://11bpics.site/)

## Features

- **Hero cover** with the class name, year and slowly changing group photos.
- **Teacher's message** styled like a printed photo with a handwritten signature.
- **Gallery** with autoplay, a progress bar, thumbnails, spring/autumn filters, swipe and keyboard support, and a full-screen photo viewer.
- **Class cards**: flip a card to read what each student wrote. Browse by swiping, with arrows or from the list of all students.
- **Works on any device**: phones in portrait or landscape, tablets and desktops.
- **Fast**: lightweight `.webp` images and small thumbnails. Photos load only when needed, and the slideshow pauses when it's off screen.
- **Accessible**: keyboard navigation, screen reader labels, and reduced animation for visitors who ask for less motion.
- **No build step**: plain HTML, CSS and JavaScript. Beginner-friendly and commented.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)
- A text editor (VS Code, Sublime Text, Notepad++, etc.)

### Installation

```bash
git clone https://github.com/awensiscc/11b-album.git
cd 11b-album
```

Open `index.html` in your browser. Double-clicking it works, but a local web server behaves most like the real site:

```bash
npx serve .
```

## Usage

### Changing the content

Everything you see on the page (photos, names and phrases) comes from **`data.js`**:

- `GROUP_PHOTOS`: gallery photos, in order. Each photo has a fast `file`, a best-quality `full` version for the enlarged view, and a `season` (`'spring'` or `'autumn'`).
- `STUDENTS`: one entry per student, with a `photo`, a `name` and a `phrase` for the back of the card. Leave `phrase` empty and the card won't flip.
- `HERO_PHOTOS`: the photos that fade behind the title at the top.

To add a gallery photo, put it in `group_photos/`, put a small copy (about 200px tall) with the same name in `group_photos/thumbs/`, and add a line to `GROUP_PHOTOS`.

### Project structure

| File / folder          | What it is                                      |
| ---------------------- | ----------------------------------------------- |
| `index.html`           | Page structure and texts (teacher's message)    |
| `data.js`              | Album content: photos, students, phrases        |
| `script.js`            | Slideshow, cards, full-screen viewer            |
| `style.css`            | Colors, fonts, layout (colors are at the top)   |
| `group_photos/`        | Gallery photos (+ `thumbs/` previews)           |
| `images/`              | Student portraits                               |
| `og-image.jpg`         | Preview picture shown when the link is shared   |

### Styles

The main colors and fonts are defined once at the top of `style.css` (`--accent`, `--bg`, …). Change them there to restyle the entire site.

## Contributing

Feel free to fork the repository and submit pull requests. Any improvements or suggestions are welcome.

## License

This project is open-source and available under the MIT License.

## Acknowledgments

- **@ueberchirho**: I want to express my immense gratitude to my friend @ueberchirho, who greatly assisted me in developing this website.
- **ChatGPT**: Assisted in generating ideas and solving coding challenges.
- **Community Resources**: Various tutorials and documentation that helped in the development process.

## Contact

If you have any questions or need further assistance, please open an issue in the repository or contact us directly on Telegram (@cnkoitsa, @ueberchirho).
