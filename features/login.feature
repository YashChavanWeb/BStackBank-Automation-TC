@login @smoke @regression
Feature: User Login
  As a BStackBank user
  I want to log in to the application
  So that I can access my banking features

  Background:
    Given the BStackBank app is launched

  @valid-login
  Scenario: Successful login using autofill Regular User
    When I tap the autofill regular user button
    And I tap the login button
    Then I should see the home dashboard

  @invalid-login
  Scenario: Login fails with invalid credentials
    When I enter username "invalid@example.com"
    And I enter password "wrongpassword"
    And I tap the login button
    Then I should see an error message
