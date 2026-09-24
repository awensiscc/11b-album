/*
 * ============================================================
 *  ALBUM CONTENT
 * ============================================================
 *  This is the only file you need to edit to change what the
 *  album shows. Everything else (layout, animations, controls)
 *  is built automatically from the lists below.
 *
 *  - Paths are relative, so the site also works when you open
 *    index.html straight from your computer.
 *  - Order in these lists = order on the page.
 * ============================================================
 */

/*
 * GROUP PHOTOS (gallery section)
 *
 *  file   - picture shown in the gallery (webp, loads fast)
 *  full   - best-quality version, opened when a photo is enlarged
 *  season - which chapter the photo belongs to: 'spring' or 'autumn'
 *
 *  A small preview for the thumbnail strip is expected in
 *  group_photos/thumbs/ with the same name as `file`.
 */
const GROUP_PHOTOS = [
    // spring photoshoot
    { file: 'photo1.webp', full: 'group_photo_1_high.webp', season: 'spring' },
    { file: 'photo2.webp', full: 'photo2.jpg', season: 'spring' },
    { file: 'photo3.webp', full: 'photo3.jpg', season: 'spring' },
    { file: 'photo5.webp', full: 'photo5_high.webp', season: 'spring' },
    { file: 'photo6.webp', full: 'photo6.jpg', season: 'spring' },
    { file: 'photo7.webp', full: 'photo7.jpg', season: 'spring' },
    { file: 'photo8.webp', full: 'photo8_high.webp', season: 'spring' },
    { file: 'photo9.webp', full: 'photo9_high.webp', season: 'spring' },
    { file: 'photo10.webp', full: 'photo10_high.webp', season: 'spring' },
    { file: 'photo11.webp', full: 'photo11_high.webp', season: 'spring' },
    { file: 'photo21.webp', full: 'photo21.jpg', season: 'spring' },
    { file: 'photo22.webp', full: 'photo22.jpg', season: 'spring' },
    { file: 'photo23.webp', full: 'photo23.jpg', season: 'spring' },
    { file: 'photo13.webp', full: 'photo13.jpg', season: 'spring' },
    { file: 'photo16.webp', full: 'photo16.jpg', season: 'spring' },
    { file: 'photo14.webp', full: 'photo14.jpg', season: 'spring' },
    { file: 'photo15.webp', full: 'photo15.jpg', season: 'spring' },
    { file: 'photo17.webp', full: 'photo17.jpg', season: 'spring' },
    { file: 'photo19.webp', full: 'photo19.jpg', season: 'spring' },
    { file: 'photo20.webp', full: 'photo20.jpg', season: 'spring' },
    { file: 'vesna_last.webp', full: 'vesna_last.jpg', season: 'spring' },

    // autumn photoshoot
    { file: 'osen_horiz_1.webp', full: 'osen_horiz_1.jpg', season: 'autumn' },
    { file: 'osen_horiz_2.webp', full: 'osen_horiz_2.jpg', season: 'autumn' },
    { file: 'osen_horiz_3.webp', full: 'osen_horiz_3.jpg', season: 'autumn' },
    { file: 'osen_horiz_4.webp', full: 'osen_horiz_4.jpg', season: 'autumn' },
    { file: 'osen_horiz_5.webp', full: 'osen_horiz_5.jpg', season: 'autumn' },
    { file: 'osen_horiz_6.webp', full: 'osen_horiz_6.jpg', season: 'autumn' },
    { file: 'osen_horiz_7.webp', full: 'osen_horiz_7.jpg', season: 'autumn' },
    { file: 'osen_horiz_8.webp', full: 'osen_horiz_8.jpg', season: 'autumn' },
    { file: 'osen_horiz_9.webp', full: 'osen_horiz_9.jpg', season: 'autumn' },
    { file: 'osen_horiz_10.webp', full: 'osen_horiz_10.jpg', season: 'autumn' },
    { file: 'osen_horiz_11.webp', full: 'osen_horiz_11.jpg', season: 'autumn' },
    { file: 'osen_horiz_12.webp', full: 'osen_horiz_12.jpg', season: 'autumn' },
    { file: 'osen_horiz_13.webp', full: 'osen_horiz_13.jpg', season: 'autumn' },
    { file: 'osen_horiz_14.webp', full: 'osen_horiz_14.jpg', season: 'autumn' },
    { file: 'osen_vert_1.webp', full: 'osen_vert_1.jpg', season: 'autumn' },
    { file: 'osen_vert_2.webp', full: 'osen_vert_2.jpg', season: 'autumn' },
    { file: 'osen_vert_3.webp', full: 'osen_vert_3.jpg', season: 'autumn' },
    { file: 'osen_vert_4.webp', full: 'osen_vert_4.jpg', season: 'autumn' },
    { file: 'osen_vert5.webp', full: 'osen_vert5.jpg', season: 'autumn' },
    { file: 'osen_vert6.webp', full: 'osen_vert6.jpg', season: 'autumn' },
    { file: 'osen_vert7.webp', full: 'osen_vert7.jpg', season: 'autumn' },
    { file: 'osen_vert_8.webp', full: 'osen_vert_8.jpg', season: 'autumn' },
    { file: 'osen_vert_9.webp', full: 'osen_vert_9.jpg', season: 'autumn' },
    { file: 'osen_horiz_last.webp', full: 'osen_horiz_last.jpg', season: 'autumn' },
];

/*
 * STUDENTS (class section)
 *
 *  photo  - portrait inside the images/ folder
 *  name   - shown on the card
 *  phrase - text on the back of the card. Leave it empty ('')
 *           and the card simply won't flip.
 */
const STUDENTS = [
    {
        photo: 'student1.webp',
        name: 'Микита Дорошенко',
        phrase: 'qer 3301 qeweff the fddsteg biggest ffddsrwr puzzle fdsgfggfg in fds12gew da dfs6weg wrld eww1ew? who is next?🌊'
    },
    { photo: 'student2.webp', name: 'Микита Тельчаров', phrase: 'ACHT🎩' },
    { photo: 'student3.webp', name: 'Надія Шукалюк', phrase: 'Фан встреча Nadiiii' },
    { photo: 'student4.webp', name: 'Владислава Пучинська', phrase: 'Пучік-Шукік-Шукалік' },
    { photo: 'student5.webp', name: 'Андрій Іванов', phrase: 'Все буде добре, для кожного з нас.' },
    { photo: 'student6.webp', name: 'Дарія Фесенко', phrase: 'Це, не на вас, це на ситуацію!' },
    { photo: 'student7.webp', name: 'Ігор Косаківський', phrase: 'за 11 років я все ще не зрозумів математику' },
    { photo: 'student8.webp', name: 'Богдан Діденко', phrase: 'нанана' },
    { photo: 'student9.webp', name: 'Денис Сторожук', phrase: 'Життя надто важливе, щоб сприймати його серйозно.' },
    { photo: 'student10.webp', name: 'Оксана Браткевич', phrase: 'oksana снайпеrrr' },
    { photo: 'student11.webp', name: 'Катерина Кравченко', phrase: 'Санечка снимает' },
    { photo: 'student12.webp', name: 'Евеліна Станкова', phrase: '' },
    { photo: 'student13.webp', name: 'Максим Кюркчіу', phrase: '' },
    { photo: 'student14.webp', name: 'Владислав Шкуріна', phrase: 'witch and snake my bfs' },
    { photo: 'student15.webp', name: 'Марія Мироненко', phrase: '' },
    { photo: 'student16.webp', name: 'Вероніка Лутенко', phrase: '12:53\nveronika ne vor\nВідкласти\nСтоп' },
    { photo: 'student17.webp', name: 'Анастасія Гафенко', phrase: '' },
    { photo: 'student18.webp', name: 'Анастасія Мороз', phrase: '' },
    { photo: 'student19.webp', name: 'Марія Бандурова', phrase: '' },
    { photo: 'student20.webp', name: 'Марго Бондар', phrase: '' },
    { photo: 'student22.webp', name: 'Валерія Бец', phrase: '' },
    { photo: 'student23.webp', name: 'Соломонова Софія', phrase: '' },
    { photo: 'student24.webp', name: 'Вікторія Василенко', phrase: '' },
    { photo: 'student25.webp', name: 'Артем Богданов', phrase: '' },
    { photo: 'student26.webp', name: 'Надія Цуркан', phrase: '' },
    { photo: 'student27.webp', name: 'Костянтин Краснян', phrase: '' },
    { photo: 'student28.webp', name: 'Кіра Лафазан', phrase: '' },
];

/*
 * HERO BACKGROUND
 * Photos (from group_photos/) that slowly fade behind the title.
 */
const HERO_PHOTOS = ['photo1.webp', 'osen_horiz_1.webp', 'photo23.webp', 'osen_horiz_last.webp'];
