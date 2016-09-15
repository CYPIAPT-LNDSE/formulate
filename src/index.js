require('ng-admin');

const app = angular.module('formulationTool', ['ng-admin'])
  .config(['NgAdminConfigurationProvider', nga => {
    const admin = nga.application('formulationTool');

    require('./entity/edges')(nga, admin);
    const clients = require('./entity/clients')(nga, admin);
    require('./entity/nodes')(nga, admin);

    nga.configure(admin);

    admin.menu(nga.menu()
        .addChild(nga.menu(clients).icon('<span class="glyphicon glyphicon-user"></span>'))
    );
  }])
  .factory('serializeParams', [() => {
    const serializer = {
      request(config) {
        const paramSerializer = (param) => param;
        const params = JSON.stringify(config.params) || {};
        return Object.assign({}, config, { paramSerializer, params });
      },
    };

    return serializer;
  }])
  .config(['$httpProvider', $httpProvider =>
    $httpProvider.interceptors.push('serializeParams'),
  ])
  .config(['RestangularProvider', RestangularProvider => {
    RestangularProvider.addFullRequestInterceptor(
      (element, operation, what, url, headers, params) => {
        if (operation === 'getList') {
          const dir = params._sortDir === 'DESC' ? -1 : 1;
          const sort = {};

          params.$skip = (params._page - 1) * params._perPage;
          params.$limit = params._perPage;

          if (params._sortField) {
            sort[params._sortField] = dir;
            params.$sort = sort;
          }

          delete params._page;
          delete params._perPage;
          delete params._sortField;
          delete params._sortDir;
        }

        if (operation === 'getList' && params._filters) {
          Object.keys(params._filters).reduce((acc, filter) => {
            if (filter === 'id') {
              acc[filter] = {
                $in: params._filters[filter],
              };
              return acc;
            }

            acc[filter] = {
              $regex: params._filters[filter],
              $options: 'i',
            };

            return acc;
          }, params);

          delete params._filters;
        }

        return { params };
      });
  }]);

require('./directives/graph')(app);
