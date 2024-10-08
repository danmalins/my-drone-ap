import React from 'react';
import './Theory.css';

const Theory = () => {
  return (
    <div className="theory">
      <h1>Теоретична інформація</h1>

      <section className='what-is-drone'>
        <h2>Що таке Дрон?</h2>
        <div className='content-wrapper'>
          <div className='text-content'>
            <text>Дрон - (у нашому випадку) безпілотний літальний апарат, який здатний автономно переміщатися в повітрі
           і не вимагає безпосереднього пілотування, тобто апарати, що управляються за допомогою бортового комп'ютера
            або дистанційно з пульта або VR-засобів.</text>
            
            <p>Перші зразки безпілотників з'явилися ще наприкінці 19 століття 
            і розроблялися у військових цілях. Повністю автономні дрони почали виготовляти у другій половині 20 століття, 
            регулярно удосконалюючи механізм їхньої роботи.</p>
            
            <p>Сучасні БПЛА відрізняються показниками. Проте в основі будь-якого безпілотника лежать базові принципи:</p>
        <ul>
          <li>Здатність самостійно переміщатися у повітрі;</li>
          <li>Вміння витримувати задану висоту та швидкість польоту;</li>
          <li>Переміщення додаткового навантаження різної маси;</li>
          <li>Можливість встановлення на апарат додаткового обладнання для фіксації даних
             та передачі інформації оператору в реальному часі.</li>
        </ul>
        </div>
        </div>
      </section>
      
      <section className='drone-components'>
        <h2>Основні компоненти дрону</h2>
        <div className='content-wrapper'>
          <div className='text-content'>
        <p>Подивимось будову дрону відомого як VTOL (Vertical Take-Off and Landing) дрон.</p>
        <ul>
          <li>Рама - основна структура дрону, на якій кріпляться решта компонентів.</li>
          <li>Крила – великі білі поверхні, що забезпечують підйомну силу.</li>
          <li>Пропелери - видно кілька пропелерів, які забезпечують тягу.</li>
          <li>Двигуни - хоча вони не видно прямо, вони повинні бути прикріплені до пропелерів.</li>
          <li>Корпус – центральна частина дрону, де розміщується більшість електронних компонентів.</li>
          <li>Камера - видно підвісну камеру в нижній частині дрону.</li>
          <li>Акумулятор - хоч не видно безпосередньо, але, ймовірно, це один із чорних блоків.</li>
          <li>Політний контролер – знаходиться усередині корпусу.</li>
          <li>Антени - видно невеликі елементи, що виступають, які є антенами.</li>
          <li>Шасі – видно елементи, на які дрон спирається при посадці.</li>
          <li>Обтічник - передня частина дрону, що покращує аеродинаміку.</li>
        </ul>
        </div>
        <img src="/images/drone-components.jpg" alt="Компоненты дрона" className='drone-components-image'/>
        </div>
      </section>

      <section className='drone-types'>
        <h2>Основні види дронів</h2>
        <div className='content-wrapper'>
          <div className='text-content'>
        <p>Дрони класифікують за різними критеріями: кількістю та розташуванням 
           гвинтів або крил, мети використання, дальності польоту, масі корисного
           навантаження, базового механізму та ін. За технічними характеристиками
           виділяють дрони трьох видів:</p>
        <ul>
          <li>вертолітного/коптерного (мультироторні – мультикоптерні та співвісні);</li>
          <li>літакового ( з нерухомим крилом );</li>
          <li>гібридного (з гвинтами та крилами).</li>
        </ul>
        <h2>Основні типи дронів</h2>
        <ul>
          <li>Мікро. Такі БПЛА важать менше 10 кг, максимальний час перебування у повітрі – 60 хвилин.</li>
          <li>Міні. Вага цих апаратів сягає 50 кг, час перебування у повітрі сягає 5 годин.</li>
          <li>Міді. Безпілотні літальні апарати вагою до 1 тонни розраховані на 15 годин польоту.</li>
          <li>Важкі безпілотники.</li>
        </ul>
        <p>За типом управління безпілотники поділяються на GPS і FPV дрони. Трохи детальніше розглянемо
           FPV-дрони.  Такі БЛА використовуються для реалізації вільного динамічного польоту в режимі від 
           першої особи, що дозволяє дарувати користувачеві неймовірні відчуття — польоту птиці. Згадана 
           свобода польоту стає доступною завдяки відсутності у FPV дронів будь-яких електронних обмежень, 
           як у потужності, так і в управлінні. В ідеалі такі дрони збираються та налаштовуються користувачем 
           з нуля з урахуванням особистих переваг.</p>
        </div>
        <img src="/images/drone-types.jpg" alt="Типи дронів" className='drone-types-image'/>
        </div>
      </section>

      <section className='construct-features'>
        <h2>Особливості конструкції БПЛА</h2>
        <div className='content-wrapper'>
          <div className='text-content'>
            <p>Принцип роботи БПЛА залежить від його конструктивних особливостей. 
              Існує кілька компонувальних схем, яким відповідає більшість сучасних БПЛА:</p>
        <ul>
          <li>Фіксоване крило. У цьому випадку пристрої близькі до літакового компонування,
            мають роторні або реактивні двигуни. Такий варіант найбільш економічний за паливом
            і має великий радіус дії;</li>
          <li>Мультикоптер. Це гвинтові машини, оснащені не менш ніж двома моторами, здатні 
            здійснювати вертикальний зліт / посадку, зависати у повітрі;</li>
          <li>Вертолітний тип. Компонування вертолітне, системи гвинтів можуть бути різними, 
            наприклад, часто оснащуються співвісними гвинтами, що ріднить моделі з такими 
            машинами, як «Чорна акула»;</li>
          <li>Конвертиплана. Це комбінація вертолітної та літакової схеми. Для економії простору
             піднімаються у повітря такі машини вертикально, у польоті змінюється конфігурація крила, 
             і стає можливим літаковий метод пересування;</li>
          <li>Планери. В основному це пристрої без двигунів, які скидаються з більш важкої машини і 
            рухаються по заданій траєкторії. Цей тип підходить для розвідувальних цілей.</li>
        </ul>
        </div>
        </div>
      </section>

      <section className='flight-features'>
        <h2>Особливості польоту БПЛА</h2>
        <div className='content-wrapper'>
          <div className='text-content'>
            <p>Повітряна розвідка – одне з основних завдань виконання польотів БПЛА:</p>
            <text>Повітряна розвідка виконується:
            за визначеними точками – шляхом прокладання курсу для
            БПЛА на картографічній основі, яка знаходиться у пункті 
            дистанційного пілотування зовнішнього пілота (оператора). 
            Як правило, здійснюється в автоматичному режимі, без 
            втручання в маршрут польоту. Також зачасту аеророзвідка проводиться 
            вручну з використанням оператора. В залежності від ситуації 
            в програмі може бути чи не бути маршруту польоту, тому іноді для виконань
            цілей розвідки оператор вистраює маршрут самостійно і в реальному
            часі реагує на будь-яку небезпеку якщо вона з'являється.</text>
            <p>Не менш важливо протидіяти можливим засідкам противника.</p>
            <text>Під час повітряної розвідки для визначення потенційних
            місць облаштування засідок противником необхідно:
            вивчаючи район майбутніх польотів по карті, відзначити
            придатні для засідок противника ділянки доріг. Як правило,
            ці ділянки зі складним рельєфом, лісові масиви, різкі повороти, 
            мости, біля яких є зручна дорога для відходу диверсійних
            груп. Особливу увагу необхідно приділяти другій половині
            маршруту, ділянці дороги, що ближче до кінцевого пункту
            призначення.</text>
            <p>До особливостей польоту БПЛА окрім розвідки також відносяться інщі військові операції.</p>
            <text>БПЛА можуть завдавати ударів, ведучи бомбардування з повітря (скидання безпосередньо над 
              цілями таких боєзарядів як ручні гранати, мінометні снаряди або інші пристосовані вибухові пристрої),
               запускаючи ракети або безпосередньо врізаючись у вразливі цілі, а також вибухаючи на підльоті до них, 
               дістаючи ціль від самопідриву. БПЛА можуть бути оснащені такою зброєю, як керовані бомби, касетні бомби, 
               запальні пристрої, ракети "повітря-поверхня", ракети "повітря-повітря", протитанкові керовані ракети або 
               інші типи високоточних боєприпасів, автогарматів і кулеметів; їх боєзаряди можуть включати вибухові речовини, 
               уламки, хімічні, радіологічні чи біологічні небезпеки.</text>
        </div>
        </div>
      </section>

      <section className='drone-in-war'>
        <h2>Використання дронів у військовій справі</h2>
        <div className='content-wrapper'>
          <div className='text-content'>
        <text>В 1991 безпілотники AAI RQ-2 Pioneer і AeroVironment FQM-151 Pointer 
          використовувалися для спостереження під час війни в Перській затоці. В 1993 
          безпілотні апарати General Atomics Gnat були протестовані для спостереження в 
          Югославських війнах. У 2001-2002 pp. Безпілотники MQ-1 Predator були оснащені 
          ракетами для ураження ворожих цілей. З початку століття більшість ударів безпілотників 
          було завдано збройних сил США в таких країнах, як Афганістан, Пакистан, Сирія, Ірак, 
          Сомалі та Ємен, з використанням ракет класу «повітря-поверхня». Але переважно це були 
          точкові антитерористичні удари. Масована атака дронами з боку ІДІЛ на сирійську авіабазу 
          Хмеймім 6 січня 2018 року, яку відбили, розміщені там війська РФ. Це вважається першою 
          такою атакою в історії воєн.</text>
          <p>В Україні виготовлення військових дронів розпочалося з 2016 року на авіазаводі «Антонов». 
            Зараз активно використовуються військові тактичні безпілотники "Лелека-100", Spectator-М1, "Фурія", 
            PD-2, "Валькірія", призначені для розвідки. Український ударно-розвідувальний БПЛА Punisher застосовують 
            і в рятувальних операціях, дрон допомагає транспортувати медичні засоби, щоб надавати допомогу пораненим.</p>
        </div>
        <img src="/images/drone-in-war.jpg" alt="Військові дрони" className='drone-in-war-image'/>
        </div>
      </section>
     
      <section className='drone-controller'>
        <h2>Огляд контроллера для БПЛА</h2>
        <div className='content-wrapper'>
          <div className='text-content'>
        <p>Розглянемо контроллер для керування БПЛА - SIYI MK32</p>
        <ul>
          <text>SIYI MK32-це радіоприймач з 7-дюймовим сенсорним екраном високої яскравості HD, 
            він відмінно підходить для багатороторних дронів для аерофотозйомки, безпілотних 
            літальних апаратів для пошуку, мониторингу, доставки, огляду та ін. буд.</text>
          
            <li><strong>Джойстики (J1-J4):</strong>
          <ul>
            <li>J1 (Елерон) - керує креном (нахилом вправо/вліво)</li>
            <li>J2 (Елеватор, Режим 2) - керує тангажем (нахилом вперед/назад)</li>
            <li>J3 (Газ, Режим 2) - контролює висоту польоту</li>
            <li>J4 (Руль напрямку) - керує рисканням (поворотом навколо вертикальної осі)</li>
          </ul>
        </li>
        <li><strong>3-позиційні перемикачі (SA-SF):</strong> Використовуються для різних функцій, наприклад, вибору режимів польоту</li>
        <li><strong>Поворотні регулятори (LD1, LD2, RD1, RD2):</strong> Можуть використовуватися для точного налаштування різних параметрів</li>
        <li><strong>Кнопки (S1, S2):</strong>
          <ul>
            <li>S1 керує нахилом прожектора A</li>
            <li>S2 керує центруванням прожектора B</li>
          </ul>
        </li>
      </ul>
      <h3>Додаткові інтерфейси:</h3>
      <ul>
        <li>Порт Type-C для зарядки або підключення до комп'ютера</li>
        <li>S.Bus Output / PPM Output / PPM Input для підключення додаткового обладнання</li>
        <li>LAN (Ethernet) для мережевого підключення</li>
        <li>Слот для SIM-карти та TF-карти (ймовірно для зберігання даних)</li>
        <li>Індикатор заряджання</li>
      
        </ul>
        </div>
        <img src="/images/drone-controller.jpg" alt="Контроллер" className='drone-controller-image'/>
        </div>
      </section>

      <section className='drone-control'>
  <h2>Правила керування БПЛА</h2>
  <div className='content-wrapper'>
    <div className='text-content'>
      <ol>
        <li><strong>Підготовка до польоту:</strong>
          <ul>
            <li>Перевірте заряд акумулятора дрона та пульта керування</li>
            <li>Огляньте дрон на наявність пошкоджень</li>
            <li>Переконайтеся, що пропелери надійно закріплені</li>
            <li>Виберіть безпечне місце для зльоту та посадки</li>
          </ul>
        </li>
        <li><strong>Зліт:</strong>
          <ul>
            <li>Увімкніть пульт керування, потім дрон</li>
            <li>Дочекайтеся встановлення зв'язку між дроном і пультом</li>
            <li>Повільно збільшуйте газ (джойстик J3) для підняття дрона</li>
            <li>Утримуйте стабільну висоту перед подальшими маневрами</li>
          </ul>
        </li>
        <li><strong>Політ:</strong>
          <ul>
            <li>Використовуйте джойстик J1 для руху вліво/вправо</li>
            <li>Джойстик J2 контролює рух вперед/назад</li>
            <li>Джойстик J4 відповідає за повороти</li>
            <li>Підтримуйте безпечну висоту та відстань від перешкод</li>
            <li>Слідкуйте за рівнем заряду акумулятора</li>
          </ul>
        </li>
        <li><strong>Посадка:</strong>
          <ul>
            <li>Виберіть рівну поверхню для посадки</li>
            <li>Повільно знижуйте висоту, зменшуючи газ</li>
            <li>Уникайте різких рухів при наближенні до землі</li>
            <li>Після торкання землі повністю вимкніть двигуни</li>
          </ul>
        </li>
        <li><strong>Після польоту:</strong>
          <ul>
            <li>Вимкніть дрон, потім пульт керування</li>
            <li>Перевірте дрон на наявність пошкоджень</li>
            <li>За необхідності зарядіть акумулятори</li>
          </ul>
        </li>
      </ol>
      <p><strong>Пам'ятайте:</strong> Завжди дотримуйтесь місцевих правил та законів щодо використання БПЛА. Безпека - головний пріоритет при керуванні дроном.</p>
    </div>
    {/* <img src="/images/drone-control.jpg" alt="Керування дроном" className='drone-control-image'/> */}
  </div>
</section>

      <footer className="theory-footer">
        <p>© 2024 Симулятор БПЛА. Всі права захіщені.</p>
      </footer>
    </div>
  );
};

export default Theory;