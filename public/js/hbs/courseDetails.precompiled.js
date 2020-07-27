(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['courseDetails'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link href=\"vendor/datatables/dataTables.bootstrap4.min.css\" rel=\"stylesheet\">\n<div class=\"container-fluid\" id=\"mainContent\">\n    <div class=\"d-sm-flex align-items-center justify-content-between mb-4\">\n        <h1 class=\"h3 mb-0 text-gray-800\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"courseName") || (depth0 != null ? lookupProperty(depth0,"courseName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"courseName","hash":{},"data":data,"loc":{"start":{"line":4,"column":42},"end":{"line":4,"column":56}}}) : helper)))
    + "</h1>\n    </div>\n    <div>\n		<ul class=\"nav nav-pills nav-justified\">\n			<li class=\"nav-item\">\n				<a class=\"nav-link active\" data-toggle=\"tab\" href=\"#classes\">Classes</a>\n			</li>\n			<li class=\"nav-item\">\n				<a class=\"nav-link\" data-toggle=\"tab\" href=\"#materails\">Materials</a>\n			</li>\n			<li class=\"nav-item\">\n				<a class=\"nav-link\" data-toggle=\"tab\" href=\"#assignments\">Assignments</a>\n			</li>\n			<li class=\"nav-item\">\n				<a class=\"nav-link\" data-toggle=\"tab\" href=\"#recordedClasses\">Recorded Classes</a>\n			</li>\n			<li class=\"nav-item\">\n				<a class=\"nav-link\" data-toggle=\"tab\" href=\"#recordedClasses\">Exams</a>\n			</li>\n		</ul>\n    </div>\n    <br>\n<div class=\"tab-content\">\n<div id=\"classes\" class=\"tab-pane container-fluid active\">\n\n</div>\n<div id=\"materails\" class=\"tab-pane fade\">\n\n</div>\n<div id=\"assignments\" class=\"tab-pane fade\">\n\n</div>\n</div>\n</div>\n";
},"useData":true});
})();