import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigatioMenuSelectors} from "cypress/scopesSelectors/navigatioMenuSelectors";
import allUsersPageData from "cypress/fixtures/allUsersFixture.json";
import allUsersPageContent from "src/dictionary/AllUsersPageContent.json";
import allWayPageData from "cypress/fixtures/allWaysFixture.json";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import aboutProjectPageContent from "src/dictionary/AboutProjectPageContent.json";
import aboutProjectPageData from "cypress/fixtures/aboutProjectPageFixure.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {aboutProjectSelectors} from "cypress/scopesSelectors/aboutProjectSelectors";
import {homeSelectors} from "cypress/scopesSelectors/homeSelectors";
import homePageContent from "src/dictionary/HomePageContent.json";

describe('Navigation menu scope tests', () => {

    beforeEach(() => {
      cy.visit('/');
      headerSelectors.getBurgerMenu().click();
    });

    it('NoAuth_NavMenu_Light_MastersWayLogo', () => {
        navigatioMenuSelectors.menuItemLinks.getLogoItemLink().click();

        cy.url().should('include', '/');
        homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    });

    it('NoAuth_NavMenu_Home', () => {
        navigatioMenuSelectors.menuItemLinks.getHomeItemLink().click();

        cy.url().should('include', '/');
        homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    });
  
    it('NoAuth_NavMenu_AllUsers', () => {
        navigatioMenuSelectors.menuItemLinks.getAllUsersItemLink().click();

        cy.url().should('include', allUsersPageData.endpoint);
        allUsersSelectors.allUserssTable.getTitle().should('contain', allUsersPageContent.usersTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_AllWays', () => {
        navigatioMenuSelectors.menuItemLinks.getAllWaysItemLink().click();

        cy.url().should('include', allWayPageData.endpoint);
        allWaysSelectors.allWaysTable.getTitle().should('contain', allWaysPageContent.waysTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_About', () => {
        navigatioMenuSelectors.menuItemLinks.getAboutProjectItemLink().click();

        cy.url().should('include', aboutProjectPageData.endpoint);
        aboutProjectSelectors.welcomeBlock.getTitle().should('contain', aboutProjectPageContent.mainTitle.en);
    });
  
  });