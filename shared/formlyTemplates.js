'use strict';

angular.module(USConfig.applicationModuleName).config(['formlyConfigProvider', function(formlyConfigProvider) {
    formlyConfigProvider.setWrapper({
        name: 'horizontalBootstrapLabel',
        template: [
            '<label for="{{::id}}" class="col-sm-2 control-label">',
                '{{to.label}} {{to.required ? "*" : ""}}',
            '</label>',
            '<div class="col-sm-8">',
                '<formly-transclude></formly-transclude>',
            '</div>'
        ].join(' ')
    });

    formlyConfigProvider.setWrapper({
        name: 'horizontalBootstrapCheckbox',
        template: [
            '<div class="col-sm-offset-2 col-sm-8">',
                '<formly-transclude></formly-transclude>',
            '</div>'
        ].join(' ')
    });

    formlyConfigProvider.setType({
        name: 'horizontalInput',
        extends: 'input',
        wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
    });

    formlyConfigProvider.setType({
        name: 'horizontalCheckbox',
        extends: 'checkbox',
        wrapper: ['horizontalBootstrapCheckbox', 'bootstrapHasError']
    });
}]);
