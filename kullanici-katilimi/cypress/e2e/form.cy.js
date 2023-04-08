<reference types="cypress" />;
import React from "react";
const passingName = "selam";
const passingSurName = "naber";
const passingEmail = "hello@mail.com";
const failingEmail = "hellomailcom";
const passingPassword = "123456";
const failingPassword = "12345";

const initialLength = 2;

describe("form testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("form elemanlarının hepsi ekranda", () => {
    cy.get("input").should("have.length", 5);
    cy.get("button.submit").should("be.visible");
  });
  it("hatasız giriş yapınca üye listesine ekleniyor", () => {
    cy.get("input[name='name']").type(passingName);
    cy.get("input[name='surname']").type(passingSurName);
    cy.get("input[name='email']").type(passingEmail);
    cy.get("input[name='password']").type(passingPassword);
    cy.get("input[name='term']").click();
    cy.get("button[type='submit']").click();
    cy.get(".App.App-header ul li").should("have.length", initialLength + 1);
  });

  it("isim yokken form gönderilmiyor", () => {
    cy.get("input[name='surname']").type(passingSurName);
    cy.get("input[name='email']").type(passingEmail);
    cy.get("input[name='password']").type(passingPassword);
    cy.get("input[name='term']").click();
    cy.get("button[type='submit']").should("be.disabled");
  });

  it("mail hatalıyken form gönderilmiyor", () => {
    cy.get("input[name='name']").type(passingName);
    cy.get("input[name='surname']").type(passingSurName);
    cy.get("input[name='email']").type(failingEmail);
    cy.get("input[name='password']").type(passingPassword);
    cy.get("input[name='term']").click();
    cy.get("button[type='submit']").should("be.disabled");
  });
  it("şifre 6 haneden kısayken form gönderilmiyor", () => {
    cy.get("input[name='name']").type(passingName);
    cy.get("input[name='surname']").type(passingSurName);
    cy.get("input[name='email']").type(passingEmail);
    cy.get("input[name='password']").type(failingPassword);
    cy.get("input[name='term']").click();
    cy.get("button[type='submit']").should("be.disabled");
  });
});
