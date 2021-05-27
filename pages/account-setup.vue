<template>
  <div id="signup" class="container is-max-desktop my-4">
    <header class="main-header main-header--dark-bg block pt-6">
      <hgroup class="mb-3">
        <h1 class="logo">
          <img src="~assets/img/newspaper-logo.svg" alt="The Newspaper name">
        </h1>
        <h2>Welcome Johanna!</h2>
      </hgroup>
      <div class="intro pb-4">
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
    <form action="" method="post">
      <section class="account-details block">
        <header class="mb-3 header header--flex">
          <h5 class="header__title">Your account</h5>
          <p class="header__actions">
            <button class="button is-small" type="button">
              <span class="icon"><i class="fa fa-pencil" aria-hidden="true"></i></span>
              <span>Edit</span>
            </button>
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
      <section class="address-data block">
        <header class="mb-3 header header--flex">
          <h5 class="header__title">Address</h5>
          <p class="header__actions">
            <button class="button is-small" type="button">
              <span class="icon"><i class="fa fa-pencil" aria-hidden="true"></i></span>
              <span>Edit</span>
            </button>
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
      <section class="consent-notices block">
        <header class="mb-3">
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
      <footer class="block pb-6 mt-4">
        <p>
          <input class="button is-dark is-fullwidth" type="submit" value="Save">
        </p>
      </footer>
    </form>
  </div>
</template>
