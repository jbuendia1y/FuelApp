class ComputeFuelFormData:

    def format_value(self, value):
        return float("{:.2f}".format(value))

    def __init__(self, current_fuel_form: dict, last_fuel_form: dict) -> None:
        self.form = current_fuel_form
        if last_fuel_form:
            self.last_fuel_form = last_fuel_form.__dict__
        else:
            self.last_fuel_form = None
        print(self.last_fuel_form)

    def compute_data(self):
        km_traveled = self.__compute_km_traveled()
        full_payment = self.__compute_full_payment()
        pay_per_km = self.__compute_pay_per_km(km_traveled, full_payment)

        km_per_gallon = self.__compute_km_per_gallon(km_traveled)
        data = {
            "km_traveled": km_traveled,
            "full_payment": full_payment,
            "pay_per_km": pay_per_km,
            "km_per_gallon": km_per_gallon
        }

        return data

    def __compute_km_traveled(self):
        last_form = self.last_fuel_form
        if last_form:
            value = self.form["hour_meter"] - last_form["hour_meter"]
            return self.format_value(value)
        return 0

    def __compute_full_payment(self):
        value = self.form["price_per_gallon"] * self.form["gallons"]
        return self.format_value(value)

    def __compute_pay_per_km(self, km_traveled: int, full_payment: int):
        if km_traveled == 0:
            return 0
        else:
            value = full_payment / km_traveled
            return self.format_value(value)

    def __compute_km_per_gallon(self, km_traveled: int):
        value = km_traveled / self.form["gallons"]
        return self.format_value(value)
