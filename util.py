import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(Area, BHK, bathroom, Furnishing, Parking, Status, Transaction, Type, location):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = Area
    x[1] = BHK
    x[2] = bathroom
    x[3] = Furnishing
    x[4] = Parking
    x[5] = Status
    x[6] = Transaction
    x[7] = Type
    if loc_index >= 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0], 2)

def get_location_names():
    return __locations

def load_saved_artifacts():
    print('Loading saved artifacts...start')
    global __data_columns
    global __locations

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[8:]
    global __model
    with open("./artifacts/Delhi_house_price_prediction.pickle", "rb") as f:
        __model = pickle.load(f)

    print("Loading saved artifacts...Completed ")

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price(1000, 3, 3, 1, 2, 1, 1, 1, 'Alaknanda'))
    print(get_estimated_price(624, 2, 2, 1, 0, 1, 1, 1, 'Rohini Sector 24'))
    print(get_estimated_price(624, 3, 2, 1, 0, 1, 1, 1, 'other'))
