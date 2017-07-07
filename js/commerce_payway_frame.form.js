/**
 * @file
 * Javascript to generate PayWay Frame token in PCI-compliant way.
 */

(function ($, Drupal, drupalSettings) {

    'use strict';

    var frameInstance = null;

    /**
   * Attaches the commercePayWayFrameForm behavior.
   *
   * @type {Drupal~behavior}
   *
   * @see Drupal.commercePayWayFrameForm
   */
    Drupal.behaviors.commercePayWayFrameForm = {

        attach: function (context) {
            $(context).find('#payway-credit-card').once('commercePayWayFrameForm').each(
                function () {
                    if (frameInstance !== null) {
                        console.log('The frame was destroyed.');
                        frameInstance.destroy();
                    }

                    var submit = document.getElementById('payway-cc-submit');
                    payway.createCreditCardFrame(
                        {
                            publishableApiKey: drupalSettings.commercePayWayFrame.publishableKey
                        }, function (err, frame) {
                            frameInstance = frame;
                            console.log('The frame was created.');
                        }
                    );
                }
            );

        }

    };

})(jQuery, Drupal, drupalSettings);
