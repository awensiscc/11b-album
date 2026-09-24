/*
 * ============================================================
 *  ALBUM CONTENT
 * ============================================================
 *  This is the only file you need to edit to change what the
 *  album shows. Everything else (layout, animations, controls)
 *  is built automatically from the lists below.
 *
 *  - Photos are referred to by name (e.g. 'photo1'). The actual
 *    picture files in photos/ are made from the full-size originals
 *    by tools/build_images.py - see README.md.
 *  - Order in these lists = order on the page.
 * ============================================================
 */

/*
 * GROUP PHOTOS (gallery section)
 *
 *  photo  - name of the original in originals/gallery/ (without .jpg)
 *  season - which chapter the photo belongs to: 'spring' or 'autumn'
 */
const GROUP_PHOTOS = [
    // spring photoshoot
    { photo: 'photo1', season: 'spring' },
    { photo: 'photo2', season: 'spring' },
    { photo: 'photo3', season: 'spring' },
    { photo: 'photo5', season: 'spring' },
    { photo: 'photo6', season: 'spring' },
    { photo: 'photo7', season: 'spring' },
    { photo: 'photo8', season: 'spring' },
    { photo: 'photo9', season: 'spring' },
    { photo: 'photo10', season: 'spring' },
    { photo: 'photo11', season: 'spring' },
    { photo: 'photo21', season: 'spring' },
    { photo: 'photo22', season: 'spring' },
    { photo: 'photo23', season: 'spring' },
    { photo: 'photo13', season: 'spring' },
    { photo: 'photo16', season: 'spring' },
    { photo: 'photo14', season: 'spring' },
    { photo: 'photo15', season: 'spring' },
    { photo: 'photo17', season: 'spring' },
    { photo: 'photo19', season: 'spring' },
    { photo: 'photo20', season: 'spring' },
    { photo: 'vesna_last', season: 'spring' },

    // autumn photoshoot
    { photo: 'osen_horiz_1', season: 'autumn' },
    { photo: 'osen_horiz_2', season: 'autumn' },
    { photo: 'osen_horiz_3', season: 'autumn' },
    { photo: 'osen_horiz_4', season: 'autumn' },
    { photo: 'osen_horiz_5', season: 'autumn' },
    { photo: 'osen_horiz_6', season: 'autumn' },
    { photo: 'osen_horiz_7', season: 'autumn' },
    { photo: 'osen_horiz_8', season: 'autumn' },
    { photo: 'osen_horiz_9', season: 'autumn' },
    { photo: 'osen_horiz_10', season: 'autumn' },
    { photo: 'osen_horiz_11', season: 'autumn' },
    { photo: 'osen_horiz_12', season: 'autumn' },
    { photo: 'osen_horiz_13', season: 'autumn' },
    { photo: 'osen_horiz_14', season: 'autumn' },
    { photo: 'osen_vert_1', season: 'autumn' },
    { photo: 'osen_vert_2', season: 'autumn' },
    { photo: 'osen_vert_3', season: 'autumn' },
    { photo: 'osen_vert_4', season: 'autumn' },
    { photo: 'osen_vert5', season: 'autumn' },
    { photo: 'osen_vert6', season: 'autumn' },
    { photo: 'osen_vert7', season: 'autumn' },
    { photo: 'osen_vert_8', season: 'autumn' },
    { photo: 'osen_vert_9', season: 'autumn' },
    { photo: 'osen_horiz_last', season: 'autumn' },
];

/*
 * STUDENTS (class section)
 *
 *  photo  - name of the original in originals/students/ (without .jpg)
 *  name   - shown on the card
 *  phrase - text on the back of the card. Leave it empty ('')
 *           and the card simply won't flip.
 */
const STUDENTS = [
    {
        photo: 'student1',
        name: 'Микита Дорошенко',
        phrase: 'qer 3301 qeweff the fddsteg biggest ffddsrwr puzzle fdsgfggfg in fds12gew da dfs6weg wrld eww1ew? who is next?🌊'
    },
    { photo: 'student2', name: 'Микита Тельчаров', phrase: 'ACHT🎩' },
    { photo: 'student3', name: 'Надія Шукалюк', phrase: 'Фан встреча Nadiiii' },
    { photo: 'student4', name: 'Владислава Пучинська', phrase: 'Пучік-Шукік-Шукалік' },
    { photo: 'student5', name: 'Андрій Іванов', phrase: 'Все буде добре, для кожного з нас.' },
    { photo: 'student6', name: 'Дарія Фесенко', phrase: 'Це, не на вас, це на ситуацію!' },
    { photo: 'student7', name: 'Ігор Косаківський', phrase: 'за 11 років я все ще не зрозумів математику' },
    { photo: 'student8', name: 'Богдан Діденко', phrase: 'нанана' },
    { photo: 'student9', name: 'Денис Сторожук', phrase: 'Життя надто важливе, щоб сприймати його серйозно.' },
    { photo: 'student10', name: 'Оксана Браткевич', phrase: 'oksana снайпеrrr' },
    { photo: 'student11', name: 'Катерина Кравченко', phrase: 'Санечка снимает' },
    { photo: 'student12', name: 'Евеліна Станкова', phrase: '' },
    { photo: 'student13', name: 'Максим Кюркчіу', phrase: '' },
    { photo: 'student14', name: 'Владислав Шкуріна', phrase: 'witch and snake my bfs' },
    { photo: 'student15', name: 'Марія Мироненко', phrase: '' },
    { photo: 'student16', name: 'Вероніка Лутенко', phrase: '12:53\nveronika ne vor\nВідкласти\nСтоп' },
    { photo: 'student17', name: 'Анастасія Гафенко', phrase: '' },
    { photo: 'student18', name: 'Анастасія Мороз', phrase: '' },
    { photo: 'student19', name: 'Марія Бандурова', phrase: '' },
    { photo: 'student20', name: 'Марго Бондар', phrase: '' },
    { photo: 'student22', name: 'Валерія Бец', phrase: '' },
    { photo: 'student23', name: 'Соломонова Софія', phrase: '' },
    { photo: 'student24', name: 'Вікторія Василенко', phrase: '' },
    { photo: 'student25', name: 'Артем Богданов', phrase: '' },
    { photo: 'student26', name: 'Надія Цуркан', phrase: '' },
    { photo: 'student27', name: 'Костянтин Краснян', phrase: '' },
    { photo: 'student28', name: 'Кіра Лафазан', phrase: '' },
];

/*
 * HERO BACKGROUND
 * Gallery photos that slowly fade behind the title.
 */
const HERO_PHOTOS = ['photo1', 'osen_horiz_1', 'photo23', 'osen_horiz_last'];
