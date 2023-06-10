# import datetime
from datetime import datetime

# today = datetime.now

# print(str(today))

# import datetime
from datetime import date
# from api.models import  User
# from datetime import timedelta

d1 = date(2022, 4, 21)
# d2 = date(2022, 4, 12)

# print(d1-d2)       ## 9 Días
# print(d2-d1)       ## -9 Días

# d1 = date(2022, 5, 10)
# d2 = date(2022, 4, 12)

# print(d1-d2)        ##28 Días

hoy = datetime.date.today()
# user = User.query.filter_by(email="test@corre.com").first()

print(hoy)