import React from 'react';
import myPhoto from '../../images/my_photo.jpg';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className='student' id='student'>
      <h2 className='student__title'>Студент</h2>
      <ul className='student__container'>
        <li className='student__wrapper student__wrapper_content_info'>
          <h3 className='student__name'>Кира</h3>
          <h4 className='student__about'>Фронтенд-разработчик, 20 лет</h4>
          <p className='student__description'>Я родилась и живу в Москве, учусь в Московском Политехе на факультете информационных технологий на 3 курсе. Я очень люблю заниматься спортом, летом мы часто с друзьями собираемся играть в волейбол или баскетбол. В настоящий момент работаю школьным преподавателем по математике, в свободное время изучаю философию и JavaScript. Безумно люблю детей, но в дальнейшем планирую работать в сфере веб-разработки.</p>

          <ul className='student__contacts'>
            <li className='student__contact'>
            <a href="https://github.com/immweasel"
                target='_blank'
                rel="noreferrer"
                className='student__link links-hover'>
                Github
            </a>
            </li>
            <li className='student__contact'>
            <a href="https://vk.com/soundfieldgirl"
                target='_blank'
                rel="noreferrer"
                className='student__link links-hover'>
                Vkontakte
            </a>
            </li>
            <li className='student__contact'>
            <a href="https://t.me/soundfieldgirl"
                target='_blank'
                rel="noreferrer"
                className='student__link links-hover'>
                Telegram
            </a>
            </li>
          </ul>

        </li>
        <li className='student__wrapper'>
          <img src={myPhoto} alt="Фото студента" className='student__myphoto' />
        </li>
      </ul>


      <h2 className='student__title student__title_content_portfolio'>Портфолио</h2>
      <ul className='student__list-portfolio'>
        <li className='student__item-portfolio'>
        <a href="https://github.com/immweasel/how-to-learn"
            target='_blank'
            rel="noreferrer"
            className='student__link-portfolio links-hover'>
            Статичный сайт
            <span className='student__arrow-portfolio'>
              ↗
            </span>
          </a>
        </li>
        <li className='student__item-portfolio'>
        <a href="https://immweasel.github.io/russian-travel/"
            target='_blank'
            rel="noreferrer"
            className='student__link-portfolio links-hover'>
            Адаптивный сайт
            <span className='student__arrow-portfolio'>
              ↗
            </span>
          </a>
        </li>
        <li className='student__item-portfolio'>
        <a href="https://github.com/immweasel/mesto-react"
            target='_blank'
            rel="noreferrer"
            className='student__link-portfolio links-hover'>
            Одностраничное приложение
            <span className='student__arrow-portfolio'>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;