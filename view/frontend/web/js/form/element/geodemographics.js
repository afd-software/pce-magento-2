define([
    'Magento_Ui/js/form/element/abstract'
], function (Component, $) {
    'use strict';

    return Component.extend({

        initialize: function () {
            this._super();
            return this;
        },


        getAfdFieldName: function () {

            var fieldName = this.inputName.substr(21).slice(0, -1);

            var replacements = [
                'nhs',
                'iso',
                'dps',
                'udprn',
                'pct',
                'lea',
                'tv',
                'soa',
                'eer',
                'uprn',
                'sic',
                'id'
            ];

            for (var i = 0; i < replacements.length; i++) {
                fieldName = fieldName.replace('_' + replacements[i], '_' + replacements[i].toUpperCase());
            }

            fieldName = this.snakeToCamel(fieldName);

            fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

            return fieldName;

        },

            snakeToCamel: function (s) {
            return s.replace(/(\_\w)/g, function (m) {
                return m[1].toUpperCase();
            });
        }

    });
});