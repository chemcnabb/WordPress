/**
 * This directive will generate a HTML form field following type definition
 * rules from modelsmeta.js.
 */
azureTicketsApp
        .directive(
                'atfield',
                [
                        '$compile',
                        function($compile) {
                            return {
                                restrict : 'E',
                                scope : {
                                    atModel : '=ngModel',
                                    atLabel : '=label',
                                    atChange : '=ngChange',
                                    atUiValidate : '=uiValidate',
                                    atUiValidateWatch : '=uiValidateWatch',
                                },
                                link : function($scope, $element, $attrs) {
                                    var m = $attrs.ngModel.split('.')[0];
                                    var f = $attrs.ngModel.split('.')[1];
                                    var copyOf = angular
                                            .isDefined($attrs.atCopy) ? BWL.ModelMeta[$attrs.atCopy]
                                            : null
                                    var fieldType = angular
                                            .isDefined(BWL.ModelMeta[m]) ? BWL.ModelMeta[m][f]
                                            : copyOf[f];
                                    var _el, _label = null;
                                    var _attr = {
                                        placeholder : f,
                                        name : m + '[' + f + ']',
                                        id : $attrs.ngModel
                                    };
                                    var isPass = /Password/g.test(f);
                                    var _req = angular
                                            .isDefined($attrs.ngRequired) ? 'ng-required="true"'
                                            : '';

                                    // set label if defined
                                    if (angular.isDefined($attrs.label)) {
                                        _label = jQuery('<label />');
                                        _label.text('{{atLabel}}');
                                        if (angular
                                                .isDefined($attrs.labelClass)){_label
                                        .addClass($attrs.labelClass);}
                                    }

                                    // set proper element definition
                                    if (/^(?:String|Double|Char)/g
                                            .test(fieldType)) {
                                        _attr.type = !isPass ? 'text'
                                                : 'password',
                                                _el = jQuery('<input ' + _req
                                                        + '/>');
                                    } else if (/^(?:Text)/g.test(fieldType)) {
                                        _el = jQuery('<textarea />');
                                    } else if (/^Int/g.test(fieldType)) {
                                        _attr.type = 'number',
                                                _el = jQuery('<input ' + _req
                                                        + '/>');
                                        if (_label !== null){_label
                                                .addClass('pull-left');}

                                    } else if (/^Boolean/g.test(fieldType)) {
                                        _attr.type = 'checkbox',
                                                _el = jQuery('<input />');
                                        if (_label !== null){_label
                                                .addClass('pull-right');}
                                    } else if (/^Date|Time/g.test(fieldType)) {
                                        _attr.type = 'text',
                                                _el = jQuery('<input />');
                                        _el.attr('ui-date', true);
                                    } else if (/^.*Enum(?=\b).*$/g
                                            .test(fieldType)) {
                                        _el = jQuery('<select />');
                                        var _enum = BWL.ModelEnum[fieldType
                                                .replace(/^(.*Enum)(?=\b).*$/g,
                                                        '$1')];
                                        for ( var e in _enum) {
                                            _el
                                                    .append(jQuery(
                                                            '<option value="'
                                                                    + _enum[e]
                                                                    + '" />')
                                                            .text(e));
                                        }
                                    }

                                    // define new element attributes
                                    for (p in _attr) {
                                        _el.attr(p, _attr[p]);
                                    }
                                    for (p in $attrs) {
                                        if (angular.isString($attrs[p])
                                                && [
                                                        'ngModel',
                                                        'ngRequired',
                                                        'ngChange',
                                                        'uiValidate',
                                                        'uiValidateWatch'
                                                ].indexOf(p) === -1) {
                                            var pp = p.replace(/([A-Z]+)/g,
                                                    '-$1').toLowerCase();

                                            var v = $scope.$eval($attrs[p]) !== 0 ? $scope
                                                    .$eval($attrs[p])
                                                    : $attrs[p]

                                            _el.attr(pp,
                                                    angular.isDefined(v) ? v
                                                            : '');
                                        }
                                    }

                                    // make new element available
                                    _el.attr('ng-model', 'atModel');
                                    $element.append(_label).append(_el);

                                    if ($attrs.uiValidate){_el.attr(
                                            'ui-validate', 'atUiValidate');}
                                    if ($attrs.uiValidateWatch){_el.attr(
                                            'ui-validate-watch',
                                            'atUiValidateWatch');}

                                    if (_label !== null){$compile(_label)(
                                            $scope);}
                                    $compile(_el)($scope);
                                }
                            }
                        }
                ]);