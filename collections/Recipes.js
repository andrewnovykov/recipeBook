Recipes = new Mongo.Collection('recipes');

Recipes.allow({
	insert: function(userId, doc) {
    	return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
});


Ingredient = new SimpleSchema({
	name: {
		type: String,
		label: "Название"
	},
	amount: {
		type: String,
		label: "Количество"
	}
});


RecipeSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Название"
	},
	desc: {
		type: String,
		label: "Описание"
	},
	ingredients: {
		type: [Ingredient],
		label: "Ингридиенты"
	},
	inMenu: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	}
});

Meteor.methods({
	toggleMenuItem: function(id, currentState){
		Recipes.update(id, {
			$set: {
				inMenu: !currentState
			}
		} );
	}
});

Recipes.attachSchema(RecipeSchema);