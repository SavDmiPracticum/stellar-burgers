import orderFixture from '../fixtures/order.json';
import ingredientsFixture from '../fixtures/ingredients.json';

const BURGER_INGREDIENT = '[data-testid="burger-ingredient"]';
const INGREDIENT_NAME = '[data-testid="ingredient-name"]';
const BURGER_CONSTRUCTOR_ELEMENT = '[data-testid="burger-constructor-element"]';
const BURGER_BUN_ELEMENT = '[data-testid="bun-element"]';

describe('Тест страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.get(BURGER_INGREDIENT).as('ingredients');
  });

  describe('Тест ингредиентов', () => {
    it('Ингредиенты загружаются', () => {
      cy.get('[data-testid="burger-ingredient"]').should('have.length', 3);
    });
    it('Добавление ингредиентов в конструктор', () => {
      cy.get('@ingredients').eq(0).find('button').click();
      cy.get('@ingredients').eq(1).find('button').click();
      cy.get('@ingredients').eq(2).find('button').click();
      cy.get('[data-testid="burger-constructor-element"]').should(
        'have.length',
        2
      );
      cy.get('[data-testid="bun-element"]').should('have.length', 2);
    });
  });

  describe('Открытие модального окна разных ингредиентов', () => {
    it('Открытие и закрытие через кнопку модального окна', () => {
      cy.get('@ingredients').eq(0).click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get(INGREDIENT_NAME).should(
        'have.text',
        ingredientsFixture.data[0].name
      );
      cy.get('#modals button:first-of-type').click();
      cy.get('#modals').children().should('have.length', 0);
    });
    it('Открытие и закрытие через ESC модального окна', () => {
      cy.get('@ingredients').eq(1).click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get(INGREDIENT_NAME).should(
        'have.text',
        ingredientsFixture.data[1].name
      );
      cy.get('body').type('{esc}');
      cy.get('#modals').children().should('have.length', 0);
    });
    it('Открытие и закрытие через оверлей модального окна', () => {
      cy.get('@ingredients').eq(2).click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get(INGREDIENT_NAME).should(
        'have.text',
        ingredientsFixture.data[2].name
      );
      cy.get('#modals>div:nth-of-type(2)').click({ force: true });
      cy.get('#modals').children().should('have.length', 0);
    });
  });
});

describe('Тест создания заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'token');
    localStorage.setItem('refreshToken', 'token');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  describe('Создание заказа пользователем', () => {
    it('Проверяем авторизацию пользователя (существуют токены)', () => {
      cy.getCookie('accessToken')
        .should('exist')
        .then((token) => {
          expect(token?.value).to.equal('token');
        });
      cy.window().then((win) => {
        expect(win.localStorage.getItem('refreshToken')).to.equal('token');
      });
    });

    it('Собираем бургер, создаем заказ, очищаем конструктор', () => {
      cy.get('[data-testid="burger-ingredient"]').as('ingredients');
      cy.get('@ingredients').eq(0).find('button').click();
      cy.get('@ingredients').eq(1).find('button').click();
      cy.get('@ingredients').eq(2).find('button').click();
      cy.get('[data-testid="order-button"]').click();

      cy.wait('@createOrder');
      cy.get('#modals').children().should('have.length', 2);
      cy.get('[data-testid="order-number"]').should(
        'have.text',
        orderFixture.order.number
      );
      cy.get('#modals button:first-of-type').click();

      cy.get('#modals').children().should('have.length', 0);
      cy.get(BURGER_CONSTRUCTOR_ELEMENT).should('have.length', 0);
      cy.get(BURGER_BUN_ELEMENT).should('have.length', 0);
    });
  });
});
