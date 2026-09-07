@signup @regression
Feature: User Registration
  As a new BStackBank user
  I want to create an account
  So that I can access banking features

  Background:
    Given the BStackBank app is launched
    When I tap the Sign Up link

  @signup-fullname-field
  Scenario: Enter full name on the signup form
    Then I should see the full name input field
    When I enter full name "John Doe"
    Then the full name field should contain "John Doe"

  @signup-form-submit
  Scenario: Submit the signup form with valid details
    When I enter full name "John Doe"
    And I enter signup email "johndoe@example.com"
    And I enter signup password "SecurePass@123"
    And I confirm signup password "SecurePass@123"
    And I tap the Create Account button
    Then I should see the account creation confirmation
