# app.py

from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import tempfile
import json
import os
app = Flask(__name__)

#load station weights
data_examples = pd.read_json("data\data.json")
#data_pd = pd.DataFrame(data_examples)
#data_json_processed = data_examples.to_json(orient="records")


@app.route('/', methods=['GET', 'POST'])
def index():
    # Default data
    df = [data_examples.copy().columns.values.tolist()] + data_examples.copy().values.tolist()
    json_data = data_examples.copy().to_json(orient="records")
    

    if request.method == 'POST':
        # Update data based on form submission
        Week_Selected = request.form['Week']
        Category_Selected = request.form['Category']


        data_copy = data_examples.copy()
        filtered_data = data_copy

        ## if week is selected 

        if Week_Selected != "All Week":
            filtered_data = data_copy[data_copy["Week"]==int(Week_Selected)]

        
        if Category_Selected != "All Category":
            filtered_data = filtered_data[filtered_data["Category"]==str(Category_Selected)]


        # Fetch details from data_examples
        #print(filtered_data)
        #Apply any filters

        #data_pd2 = data_pd[data_pd["Week"]==Week_Selected]
        #print(len(data_pd2))
        #print(data_pd2)
       # print(filtered_data)
        #data = data_entries
        #df = df.append(data_examples)
        df =  [filtered_data.columns.values.tolist()] + filtered_data.values.tolist()
        json_data = filtered_data.to_json(orient="records")

        print(df)
        #print(len(filtered_data))
    return render_template('index_sample.html', data=df, json_data = json_data)

@app.route('/read_temp_data')
def read_temp_data():
    temp_file_path = os.path.join(tempfile.gettempdir(), 'temp_data.json')

    # Read data from the temporary JSON file
    with open(temp_file_path, 'r') as temp_file:
        data = json.load(temp_file)

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
