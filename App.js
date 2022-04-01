function AppViewModel() {

    const self = this;

    self.saveData = function () {
        const additionalInsurance = []
        for (let i in self.additionalInsurance()) {
            const item = self.additionalInsurance()[i];
            if (item !== undefined) {
                additionalInsurance.push(item.id)
            }
        }

        const insuranceDto = {
            "insuranceType": self.insuranceType().id,
            "insurancePackage": self.insurancePackage().id,
            "additionalInsurance": additionalInsurance,
            "startDate": self.startDate(),
            "endDate": self.endDate(),
            "numberOfPeople": self.numberOfPeople()
        }

        API.saveData(insuranceDto, (price) => {
            document.getElementById("priceLabel").hidden = false
            document.getElementById("price").hidden = false
            document.getElementById("price").textContent = price
        })
    }

    self.readInitialData = function () {
        API.readInitialData((data) => {
            self.insuranceTypeOptions.push.apply(self.insuranceTypeOptions, data.insuranceTypeOptions)
            self.insurancePackageOptions.push.apply(self.insurancePackageOptions, data.insurancePackageOptions)
            self.additionalInsuranceOptions.push.apply(self.additionalInsuranceOptions, data.additionalInsuranceOptions)
        });
    }

    self.initFields = function () {
        self.insuranceType = ko.observable()
        self.insurancePackage = ko.observable()
        self.additionalInsurance = ko.observableArray([])
        self.startDate = ko.observable()
        self.endDate = ko.observable()
        self.numberOfPeople = ko.observable()
        self.insuranceTypeOptions = ko.observableArray([])
        self.insurancePackageOptions = ko.observableArray([])
        self.additionalInsuranceOptions = ko.observableArray([])

        const today = new Date().toISOString().slice(0, 10)
        const startDateField = document.getElementById("startDate")
        const endDateField = document.getElementById("endDate")

        startDateField.min = today
        endDateField.min = today

        self.isShortTermInsuranceType = ko.computed(function () {
            return self.insuranceType() ? self.insuranceType().id === 'SHORT_TERM' : false;
        }, this);

        self.insuranceType.subscribe(function () {
            endDateField.required = self.isShortTermInsuranceType()
            if (!self.isShortTermInsuranceType()) {
                endDateField.value = null
            }
        });

        self.startDate.subscribe(function (date) {
            endDateField.min = date
            if (date > self.endDate()) {
                endDateField.value = null
            }
        });
    }
}

const vm = new AppViewModel()
vm.initFields()
vm.readInitialData()
ko.applyBindings(vm)
