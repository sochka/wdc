import angular from 'angular';
import 'app-list/list';
import 'info'
import 'user'

const appList = angular.module('appList', ['app.user', 'appList.list', 'app.info']);

appList.controller('AppListController', function ($scope, $http, $window,
                                                  appList, prompt, alert,
                                                  user) {
  angular.extend($scope, {
    user,
    apps: appList,
    oldApps: appList,
    saveApps() {
      this.oldApps = angular.copy(this.apps);
    },
    restoreApps() {
      this.apps = this.oldApps;
    },
    createApp() {
      this.saveApps();

      const app = {
        name: this.model.newAppName,
        owner: user
      };

      this.apps.push(app);

      $http.get(`/api/app/create/${app.name}`)
        .success(function (data) {
          app.id = data.id;
        })
        .error((data, error) => {
          this.restoreApps();
          alert.error(`Error while creating the app (${error}): ${data}`);
        });
    },

    renameApp(appId) {
      const newAppName = prompt('New name:');
      if (!newAppName) {
        return;
      }

      this.saveApps();
      this.apps[this.apps.findIndex(app => appId === app.id)].name = newAppName;
      $http.get(`/api/app/rename/${appId}/${newAppName}/`)
        .error((data, error) => {
          this.restoreApps();
          alert.error(`Error while renaming the app (${error}): ${data}`);
        });
    },

    deleteApp(appId, appName) {
      const confirmName = prompt('Type again name of the app to confirm deletion: ')
      if (confirmName &&  confirmName !== appName) {
        alert.error('Wrong name, app is not deleted!');
        return;
      }

      this.saveApps();
      this.apps.splice(this.apps.findIndex(app => appId === app.id), 1);
      $http.get(`/api/app/delete/${appId}`).error((data, error) => {
        this.restoreApps();
        alert.error(`Error while deleting the app (${error}): ${data}`);
      });
    }
  });
});

angular.bootstrap(document, ['appList']);
