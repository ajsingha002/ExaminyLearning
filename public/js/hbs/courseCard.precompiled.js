(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['courseCard'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"course-"
    + alias4(((helper = (helper = lookupProperty(helpers,"count") || (depth0 != null ? lookupProperty(depth0,"count") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data,"loc":{"start":{"line":1,"column":16},"end":{"line":1,"column":25}}}) : helper)))
    + "\" class=\"col-lg-6\">\n	<input hidden value=\"value.id+'\">\n	<div class=\"card shadow mb-4\">\n		<div class=\"card-header py-3\">\n			<h6 class=\"m-0 font-weight-bold text-primary\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"courseName") || (depth0 != null ? lookupProperty(depth0,"courseName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"courseName","hash":{},"data":data,"loc":{"start":{"line":5,"column":49},"end":{"line":5,"column":63}}}) : helper)))
    + "</h6>\n		</div>\n		<div class=\"card-body\">\n			"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":8,"column":3},"end":{"line":8,"column":18}}}) : helper)))
    + "\n			<br><br>\n			<div class=\"d-flex flex-row justify-content-around card-header py-2\" style=\"text-align: center;\">\n				<div class=\"p-2 h5 mb-0 font-weight-bold text-gray-800\">\n				"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":12,"column":4},"end":{"line":12,"column":12}}}) : helper)))
    + "\n				</div>\n				<div class=\"p-2\">\n					<i class=\"fas fa-rupee-sign\" aria-hidden=\"true\"></i>\n					"
    + alias4(((helper = (helper = lookupProperty(helpers,"price") || (depth0 != null ? lookupProperty(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":16,"column":5},"end":{"line":16,"column":14}}}) : helper)))
    + "/month\n				</div>\n				<div class=\"p-2\">\n					<a href=\"#\">\n						<i class=\"fas fa-plus-square fa-lg\" aria-hidden=\"true\" style=\"color: #1cc88a\"></i>\n					</a>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>";
},"useData":true});
})();