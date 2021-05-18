<template>
  <div class="form-wrapper">
    <header id="header">
      <hgroup>
        <h1>
          <img src="~assets/img/newspaper-logo.svg" alt="The Newspaper name">
        </h1>
        <h2>Welcome!</h2>
      </hgroup>
      <p>
        You are now a member of THE NEWSPAPER NAME community.
        Thank you for supporting our work!
      </p>
      <p>
        Please confirm your contact data in order to receive all benefits
        and to have your say in our reporting:
      </p>
    </header>
    <form :action="formURL" method="post">
      <section id="account-details">
        <header class="header header--flex">
          <h4 class="header__title">Your account</h4>
          <p class="header__actions">
            <button class="button button__text" type="button"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
          </p>
        </header>
        <p>
          <small class="label">Email</small>
          <span>johanna.runnebender@mail.com</span>
        </p>
        <p>
          <small class="label">Password</small>
          <span>••••••••••••••••</span>
        </p>
      </section><!-- /#account-details -->
      <section id="address">
        <header>
          <h4>Address</h4>
        </header>
        <div>
          <p>
            <label for="address-line1">Address line 1</label>
            <input class="input" type="text" name="address-line1" id="address-line1"
              value="12 The Old Vicarage, Rock Lane, Tockholes">
          </p>
          <p>
            <label for="address-line2">Address line 2</label>
            <input class="input" type="text" name="address-line2" id="address-line2">
          </p>
          <fieldset>
            <p>
              <label for="city-name">City/town</label>
              <input class="input" type="text" name="city-name" id="city-name"
                value="Darwen">
            </p>
            <p>
              <label for="postcode">Postcode</label>
              <input class="input" type="text" name="postcode" id="postcode"
                value="BB3 OLX">
            </p>
          </fieldset>
          <p>
            Can we send you occasional mail? Sometimes we send our members special
            printed editions and other exclusive materials. You can change your mind later.
          </p>
          <p class="checkbox">
            <input type="checkbox" id="mail-consent" name="mail-consent">
            <label for="mail-consent">Yes! I want to get your mails.</label>
          </p>
        </div>
      </section><!-- /#address-data -->
      <div id="submit-form">
        <p class="checkbox">
          <input type="checkbox" id="mail-consent" name="mail-consent">
          <label for="mail-consent">
            Yes, you can send me opportunities to get
            involved in THE NEWSPAPER NAME via email.
          </label>
        </p>
        <p>
          <input class="button" type="submit" value="Save">
        </p>
      </div>
    </form>
  </div>
</template>
