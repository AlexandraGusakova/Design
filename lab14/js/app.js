(function ($) {

    var contacts = [
        { name: "Гусакова Ольга", address: "Минск, пр-т газ Правда", tel: "80291234567", email: "example@mail.ru", type: "Семья" },
        { name: "Жуков Сергей", address: "Минск, пр-т Жукова", tel: "80291234567", email: "example@mail.ru", type: "Друзья" },
        { name: "Ромашко Надежда", address: "Гомель, ул. Михайлова", tel: "80291234567", email: "example@mail.ru", type: "Одногруппники" }
    ];

    var Contact = Backbone.Model.extend({
        defaults: {
            photo: "img/avatar.png",
            name: "",
            address: "",
            tel: "",
            email: "",
            type: ""
        }
    });

    var Directory = Backbone.Collection.extend({
        model: Contact
    });

    var ContactView = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",
        template: _.template($("#contactTemplate").html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        events: {
            //событие которое будет вызываться по клику на кнопку
            "click button.delete": "deleteContact"
        },

        //обработчик клика по кнопк
        deleteContact: function () {
            var removedType = this.model.get("type").toLowerCase();

            // удлаение модели
            this.model.destroy();

            // удаление со страницы. чтобы перестала отображаться
            this.remove();

            //снова рефрешим селект
            if (_.indexOf(directory.getTypes(), removedType) === -1) {
                directory.$el.find("#filter select").children("[value='" + removedType + "']").remove();
            }
        }
    });

    //ГЛАВНОЕ ПРЕДСТАВЛЕНИЕ
    var DirectoryView = Backbone.View.extend({
        el: $("#contacts"),

        initialize: function () {
            this.collection = new Directory(contacts);

            this.render();
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.renderContact, this);
            //on -метод, а событие remove удаляет ДАННЫЕ ИЗ МОДЕЛИ, чтобы при дальнейшей сортировке они не всплыли
            this.collection.on("remove", this.removeContact, this);
        },

        render: function () {
            this.$el.find("article").remove();

            _.each(this.collection.models, function (item) {
                this.renderContact(item);
            }, this);
        },

        renderContact: function (item) {
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        },

        getTypes: function () {
            return _.uniq(this.collection.pluck("type"), false, function (type) {
                return type.toLowerCase();
            });
        },

        createSelect: function () {
            var filter = this.$el.find("#filter"),
                select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item.toLowerCase(),
                    text: item.toLowerCase()
                }).appendTo(select);
            });

            return select;
        },

        // события пишутся через запятую!!!!
        events: {
            "change #filter select": "setFilter",
            "click #add": "addContact",
            // события вызова метода появления формы только при клике на неё
            "click #showForm": "showForm"
        },


        setFilter: function (e) {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        //фильтрация представления
        filterByType: function () {
            if (this.filterType === "all") {
                this.collection.reset(contacts);
                contactsRouter.navigate("filter/all");
            } else {
                this.collection.reset(contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("type").toLowerCase() === filterType;
                    });

                this.collection.reset(filtered);

                contactsRouter.navigate("filter/" + filterType);
            }
        },

        //метод обработки клика на лобавление контакта (сработает при нажатиина кнопку без перезагрузки страницы)
        addContact: function (e) {
            e.preventDefault();


            var formData = {};
            $("#addContact").children("input").each(function (i, el) {//each - метод jQuery
            // function (i, el) - функция обратного действия, которая проверяет заполнены ли поля
                if ($(el).val() !== "") {
                    formData[el.id] = $(el).val();
                }
            });


            contacts.push(formData);

            // indexOf - метод Underscore.js для поиска конкретного значения, в нашем случае наличия данного типа в селекте
            if (_.indexOf(this.getTypes(), formData.type) === -1) {
                this.collection.add(new Contact(formData));
                this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
            } else {
                this.collection.add(new Contact(formData));
            }
        },
        
        //реализация метода удаления контакта
        removeContact: function (removedModel) {
            var removed = removedModel.attributes;

            if (removed.photo === "/img/avatar.png") {
                delete removed.photo;
            }
            
            // проверяем удалены ли данные из коллекции
            _.each(contacts, function (contact) {
                if (_.isEqual(contact, removed)) {
                    contacts.splice(_.indexOf(contacts, contact), 1);
                }
            });

        },

        // метод открытия формы
        showForm: function () {
            this.$el.find("#addContact").slideToggle();
        }
    });


    var ContactsRouter = Backbone.Router.extend({
        routes: {
            "filter/:type": "urlFilter"
        },

        urlFilter: function (type) {
            directory.filterType = type;
            directory.trigger("change:filterType");
        }
    });

    var directory = new DirectoryView();
    var contactsRouter = new ContactsRouter();
    Backbone.history.start();

} (jQuery));