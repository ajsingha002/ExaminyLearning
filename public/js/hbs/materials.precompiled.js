(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['materials'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"card shadow mb-4\">\n	<!-- Card Header - Dropdown -->\n	<div class=\"card-header py-3 d-flex flex-row align-items-center justify-content-between\">\n		<h6 class=\"m-0 font-weight-bold text-primary\">Materials Activity</h6>\n	</div>\n	<!-- Card Body -->\n	<div class=\"card-body\">\n		<div class=\"table-responsive\">\n		  <table class=\"table table-bordered\" id=\"materialsDataTable\" width=\"100%\" cellspacing=\"0\">\n		    <thead>\n		      <tr>\n				<th>ID</th>\n		        <th>Name</th>\n		        <th>Description</th>\n		        <th>Link</th>\n                <th>Uploaded On</th>\n		      </tr>\n		    </thead>\n		  </table>\n		</div>\n	</div>\n</div>";
},"useData":true});
})();