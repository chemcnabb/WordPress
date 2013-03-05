AzureTickets
===========================================
<br />


# For Developers
<br />
## Requirements

You must have the following packages intalled:

* node [http://www.nodejs.org/]
* grunt [http://gruntjs.com/]
* bower [https://github.com/twitter/bower/]

### Build

Once you checkout this repository, you should be able to do

``
npm install && bower install
``

The above command will load all required libraries and components from either *node* and *bower* repositories.
Afterwards, use the *grunt* command to build or execute the tasks available for the build process.

* Use `grunt build` to generate the distribution package, which will reside in *./dist*
* Use `grunt test` to execute the tests located in *./test*. This command makes use of *testacular* [http://testacular.github.com/]
* Use `grunt wp` in order to generate a *WordPress* plugin package in *./dist/wp-azuretickets.zip*.

