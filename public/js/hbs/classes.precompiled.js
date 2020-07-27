(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['classes'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card shadow mb-4\">\n	<!-- Card Header - Dropdown -->\n	<div class=\"card-header py-3 d-flex flex-row align-items-center justify-content-between\">\n		<h6 class=\"m-0 font-weight-bold text-primary\">Ongoing Class</h6>\n	</div>\n	<!-- Card Body -->\n	<div class=\"card-body\">\n		<p><a href=\"#\" id=\"ongoingClassLink\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ongoingClassLink") || (depth0 != null ? lookupProperty(depth0,"ongoingClassLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ongoingClassLink","hash":{},"data":data,"loc":{"start":{"line":8,"column":39},"end":{"line":8,"column":59}}}) : helper)))
    + "</a></p>\n	</div>\n</div>\n<div class=\"card shadow mb-4\">\n	<!-- Card Header - Dropdown -->\n	<div class=\"card-header py-3 d-flex flex-row align-items-center justify-content-between\">\n		<h6 class=\"m-0 font-weight-bold text-primary\">Class Activity</h6>\n		<div class=\"dropdown no-arrow\">\n			<a class=\"dropdown-toggle\" href=\"#\" role=\"button\" id=\"dropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n			<i class=\"fas fa-ellipsis-v fa-sm fa-fw text-gray-400\"></i>\n			</a>\n			<div class=\"dropdown-menu dropdown-menu-right shadow animated--fade-in\" aria-labelledby=\"dropdownMenuLink\">\n				<div class=\"dropdown-header\">Filter:</div>\n				<a class=\"dropdown-item\" href=\"#\">Upcoming</a>\n				<a class=\"dropdown-item\" href=\"#\">Completed</a>\n				<div class=\"dropdown-divider\"></div>\n				<a class=\"dropdown-item\" href=\"#\">Show All</a>\n			</div>\n		</div>\n	</div>\n	<!-- Card Body -->\n	<div class=\"card-body\">\n		<div class=\"table-responsive\">\n		  <table class=\"table table-bordered\" id=\"classDataTable\" width=\"100%\" cellspacing=\"0\">\n		    <thead>\n		      <tr>\n		        <th>Date</th>\n		        <th>Topic</th>\n		        <th>Description</th>\n		        <th>Status</th>\n		        <th>Link</th>\n		      </tr>\n		    </thead>\n		  </table>\n		</div>\n	</div>\n</div>";
},"useData":true});
})();