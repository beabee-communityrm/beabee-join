<template>
  <div class="form-wrapper">
    <header class="main-header main-header--dark-bg">
      <hgroup>
        <h1 class="logo">
          <img src="~assets/img/newspaper-logo.svg" alt="The Newspaper name">
        </h1>
        <h2>Welcome Johanna!</h2>
      </hgroup>
      <div class="intro">
        <p>
          You are now a member of THE NEWSPAPER NAME community.
          Thank you for supporting our work!
        </p>
        <p>
          Please confirm your contact data in order to receive all benefits
          and to have your say in our reporting:
        </p>
      </div>
    </header>
    <form :action="formURL" method="post">
      <section class="account-details">
        <header class="header header--flex">
          <h5 class="header__title">Your account</h5>
          <p class="header__actions">
            <button class="button button__text button--small" type="button"><i class="fa fa-pencil button__icon" aria-hidden="true"></i> Edit</button>
          </p>
        </header>
        <p class="review-field">
          <small class="label review-field__label">Email</small>
          <span class="label review-field__value">johanna.runnebender@mail.com</span>
        </p>
        <p class="review-field">
          <small class="label review-field__label">Password</small>
          <span class="label review-field__value">••••••••••••••••</span>
        </p>
      </section><!-- /.account-details -->
      <section class="address-data">
        <header class="header header--flex">
          <h5 class="header__title">Address</h5>
          <p class="header__actions">
            <button class="button button__text button--small" type="button"><i class="fa fa-pencil button__icon" aria-hidden="true"></i> Edit</button>
          </p>
        </header>
        <div>
          <p class="review-field">
            <small class="label review-field__label">Address line 1</small>
            <span class="label review-field__value">12 The Old Vicarage, Rock Lane, Tockholes</span>
          </p>
          <div class="grid">
            <p class="review-field">
              <small class="label review-field__label">City/town</small>
              <span class="label review-field__value">Darwen</span>
            </p>
              <p class="review-field">
                <small class="label review-field__label">Postcode</small>
                <span class="label review-field__value">BB3 OLX</span>
              </p>
          </div>
        </div>
      </section><!-- /.address-data -->
      <section class="consent-notices">
        <header>
          <p>
            Can we send you occasional mail? Sometimes we send our members special
            printed editions and other exclusive materials. You can change your mind later.
          </p>
        </header>
        <div>
          <p class="checkbox">
            <input type="checkbox" id="mail-consent" name="mail-consent">
            <label for="mail-consent">Yes! I want to get your mails.</label>
          </p>
          <p class="checkbox">
            <input type="checkbox" id="mail-consent" name="mail-consent">
            <label for="mail-consent">
              Yes, you can send me opportunities to get
              involved in THE NEWSPAPER NAME via email.
            </label>
          </p>
        </div>
      </section><!-- /.consent-notices -->
      <footer>
        <section>
          <p>
            <input class="button button--fullwidth" type="submit" value="Save">
          </p>
        </section>
      </footer>
    </form>
  </div>
</template>
