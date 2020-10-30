# Mental Health Data Visualization Project
Dynamic and static visualizations for Mental Health datasets.

## Data

The data I propose to visualize for my project is data on mental illnesses that have affected every country in the world. These data show the percentage of people who have suffered from Depression, Anxiety, Eating Disorders, Drug Use, Alcohol Use and Schizophrenia. In addition, data are presented that show the unemployment and suicide rates through the years for each of the countries.

The data to be used for the project can be found on Gist here: 
[Mental Healths Disorders Dataset](https://gist.github.com/fmejias/8df2a27f1285576ae3cf4d67c3368144)

## Prototypes

I’ve created a proof of concept for this data by making three visualization prototypes.

The first visualization prototype consists of a line chart that shows the percentage of the population that has suffered from a mental illness since the year 1990. Through this visualization, it will be possible to analyze the percentage of the population that has suffered a mental illness over the years, and the percentage of the population that has been unemployed over the years. In addition, a line will be added that shows unemployment through the years for the country that is selected through the menu. The interaction in this graph will take place through the multiple menu that allows selecting the country and the mental illness to be analyzed.
[![image](https://user-images.githubusercontent.com/12739451/95379515-b5a2c680-08a2-11eb-9de9-33570f2238c9.png)](https://vizhub.com/fmejias/1a9d1ec4bbca4696bfa912d2c42d6c00)

The second visualization prototype consists of another line chart that shows the percentage of the population that has suffered from unemployment since the year 2000. The idea is to be able to unite this prototype with the previous prototype to show unemployment and the percentage of people who have suffered from a mental illness in a specific country on the same graph.
[![image](https://user-images.githubusercontent.com/12739451/94579996-a08cbe80-0236-11eb-82ef-6262ea163dcb.png)](https://vizhub.com/fmejias/c46b3eb72e494c72b86e1869e21490ab)

The third visualization prototype consists of bar chart that shows the percentage of the population in some American countries that suffered Schizoprenia in the years 1995, 2005 and 2015.
[![image](https://user-images.githubusercontent.com/12739451/94580013-a6829f80-0236-11eb-8d9a-631b2a9ff550.png)](https://vizhub.com/fmejias/307ce2b7425740bb856a5bf1f52162ad)

## Questions & Tasks

The following questions will drive the visualization and interaction decisions for this project:

- How has the percentage of mental diseases in each country changed over time?
- What are the most common mental illnesses that have affected each country?
- Has there been a decrease in people with mental illnesses, or rather an increase?
- How has the percentage of unemployment in each country changed over time?
- Which countries have been most affected by unemployment?
- How has the rate of suicides in each country changed over time?
- Which countries have had the highest suicide rate over the years?
- Which are the countries that have been most affected by unemployment, and what is the percentage of the population that suffers from a mental illness in these countries?

## Sketches

The idea behind this sketch is to analyze how the percentage of the population that has suffered a mental illness has varied over the years. In this case, a line chart allows me to better analyze the change in the percentage of the population over the years, and allows me to answer questions such as:
- How has the percentage of mental diseases in each country changed over time?
- Has there been a decrease in people with mental illnesses, or rather an increase?

The interaction in this graph will take place through a menu that allows selecting the country and the mental illness to be analyzed.

![image](https://user-images.githubusercontent.com/12739451/94580087-bbf7c980-0236-11eb-97ea-43ddf99f7042.png)

The idea behind this sketch is to analyze which are the 5 countries that have been most affected by unemployment, and at the same time show the percentage of the population that suffers from a mental illness. In this case, a bar chart allows me to better compare this data, and allows me to answer questions such as:
- Which countries have been most affected by unemployment?
- Which are the countries that have been most affected by unemployment, and what is the percentage of the population that suffers from a mental illness in these countries?

The interaction in this graph will take place through the menu that allows selecting the year to be analyzed.

![image](https://user-images.githubusercontent.com/12739451/95379463-a6237d80-08a2-11eb-9092-53abc4caeb43.png)

The idea behind this sketch is to analyze how the percentage of the world population that suffers from a mental illness has varied over the years. In this case, a Choropleth map allows me to better analyze the change in the percentage of the world population over the years, and allows me to answer questions such as:
- How has the percentage of mental diseases in each country changed over time?
- Has there been a decrease in people with mental illnesses, or rather an increase?

The interaction in this graph will take place through the linked line chart. In addition, it is expected to add the option to show the percentage of the population when clicking on a country.

![image](https://user-images.githubusercontent.com/12739451/95379491-ae7bb880-08a2-11eb-8a95-aae75e790810.png)

## **Schedule of Deliverables**

### **Deliverables**

#### **First Visualization**

1. Create a VizHub project for this visualization.
    - **Estimated delivery date**: October 8, 2020
1. Load the Mental Health dataset.
    - Create a program that loads and parses a CSV file.
    - **Estimated delivery date**: October 8, 2020
1. Implement a basic prototype of the first sketch.
    - Create a program that shows a static line chart.
    - Add a unique title to the visualization.
    - Add a description to the visualization.
    - **Estimated delivery date**: October 10, 2020
1. Add interaction to the visualization.
    - Add a Dropdown menu to filter the data by country and by mental disease.
    - Modify the description to explain the correct way to interact with the graph.
    - **Estimated delivery date**: October 11, 2020
1. Polish the visualization description.
    - **Estimated delivery date**: October 12, 2020
1. Export the work out of VizHub and put the source code into GitHub.
    - **Estimated delivery date**: October 13, 2020

#### **Second Visualization**
1. Create a VizHub project for this visualization.
    - **Estimated delivery date**: October 14, 2020
1. Load the Mental Health dataset.
    - Create a program that loads and parses a CSV file.
    - **Estimated delivery date**: October 14, 2020
1. Preprocess loaded dataset.
    - Create a program that allows to select the 5 countries with the highest unemployment each year.
    - **Estimated delivery date**: October 16, 2020
1. Implement a basic prototype of the second sketch.
    - Create a program that shows a static bar chart.
    - Add a unique title to the visualization.
    - Add a description to the visualization.
    - **Estimated delivery date**: October 17, 2020
1. Add interaction to the visualization.
    - Add a Dropdown menu to filter the data by year.
    - Modify the description to explain the correct way to interact with the graph.
    - **Estimated delivery date**: October 17, 2020
1. Polish the visualization description.
    - **Estimated delivery date**: October 17, 2020
1. Export the work out of VizHub and put the source code into GitHub.
    - **Estimated delivery date**: October 18, 2020

#### **Third Visualization**
1. Create a VizHub project for this visualization.
    - **Estimated delivery date**: October 18, 2020
1. Load the Mental Health dataset.
    - Create a program that loads and parses a CSV file.
    - **Estimated delivery date**: October 18, 2020
1. Implement a basic prototype of the third sketch.
    - Create a program that shows a Choropleth Map.
    - Add a unique title to the visualization.
    - Add a description to the visualization.
    - **Estimated delivery date**: October 20, 2020
1. Add new view to the map.
    - Create a program that adds a line chart into the Choropleth Map.
    - **Estimated delivery date**: October 22, 2020
1. Add interaction to the visualization.
    - Link the line chart with the Choropleth Map to show the percentage of the population that have been affected by a mental disease over the years.
    - Modify the description to explain the correct way to interact with the graph.
    - **Estimated delivery date**: October 24, 2020
1. Polish the visualization description.
    - **Estimated delivery date**: October 24, 2020
1. Export the work out of VizHub and put the source code into GitHub.
    - **Estimated delivery date**: October 24, 2020

#### **Project Document**
1. Update the project proposal document with the working visualizations.
    - Add working visualizations as screenshots that link into VizHub.
    - **Estimated delivery date**: October 28, 2020
1. Create a Future Work section.
    - **Estimated delivery date**: October 28, 2020
1. Polish the content to be presentable.
    - **Estimated delivery date**: October 28, 2020

#### **Project Video**
1. Make a video showing the work done during the course.
    - **Estimated delivery date**: October 31, 2020

### **Estimated Deliverables by October 10**
By October 10, the following tasks corresponding to the First Visualization are expected to be completed:
- Create a VizHub project for this visualization.
- Load the Mental Health dataset.
- Implement a basic prototype of the first sketch.

### **Estimated Deliverables by October 17**
By October 17, the following tasks corresponding to the First Visualization are expected to be completed:
- Add interaction to the visualization.
- Polish the visualization description.
- Export the work out of VizHub and put the source code into GitHub.

Also, the following tasks corresponding to the Second Visualization are expected to be completed:
- Create a VizHub project for this visualization.
- Load the Mental Health dataset.
- Preprocess loaded dataset.
- Implement a basic prototype of the second sketch.
- Add interaction to the visualization.
- Polish the visualization description.

### **Estimated Deliverables by October 24**
By October 24, the following tasks corresponding to the Second Visualization are expected to be completed:
- Export the work out of VizHub and put the source code into GitHub.

Also, the following tasks corresponding to the Third Visualization are expected to be completed:
- Create a VizHub project for this visualization.
- Load the Mental Health dataset.
- Implement a basic prototype of the third sketch.
- Add new view to the map.
- Add interaction to the visualization.
- Polish the visualization description.
- Export the work out of VizHub and put the source code into GitHub.

### **Estimated Deliverables by October 31**
By October 31, the following tasks are expected to be completed:
- Project Document.
- Project Video.

## **Project Progress**
By October 12, there are already two prototypes implemented based on the first Sketch. The Vizhub projects that have these prototypes are as follows:
- [Visualization of the people affected by mental illnesses over the years in some American Countries](https://vizhub.com/fmejias/1a9d1ec4bbca4696bfa912d2c42d6c00).

[![image](https://user-images.githubusercontent.com/12739451/95379515-b5a2c680-08a2-11eb-9de9-33570f2238c9.png)](https://vizhub.com/fmejias/1a9d1ec4bbca4696bfa912d2c42d6c00)

- [Visualization of the people affected by mental illnesses over the years in some American Countries using Interactive Legends](https://vizhub.com/fmejias/d7efa58e85454d598ce5acf23e31ec62).

![image](https://user-images.githubusercontent.com/12739451/95774896-8f07d580-0c7e-11eb-90c6-e6b78fa7a596.png)

By October 17, there is already one prototype implemented based on the second Sketch, and another prototype implemented based on the third Sketch. The Vizhub projects that have these prototypes are the following:
- [Visualization of the countries with the highest unemployment over the years](https://vizhub.com/fmejias/a82933ef463048d8a7b415c70686bca7).

[![image](https://user-images.githubusercontent.com/12739451/96325516-a11ea680-0fe5-11eb-882f-74281150b0dc.png)](https://vizhub.com/fmejias/a82933ef463048d8a7b415c70686bca7)

- [Visualization of the people affected by mental illnesses over the years in all the world](https://vizhub.com/fmejias/cae4cf954aa449179c330ff54c182a02).
[![image](https://user-images.githubusercontent.com/12739451/96629197-8479bb80-12d0-11eb-9ebe-b35784bc683d.png)](https://vizhub.com/fmejias/cae4cf954aa449179c330ff54c182a02)

By October 25, the three desired visualizations are already implemented, and this week the Choropleth Map was modified to link it with a Line Chart using React. In addition, a Dashboard was created with visualizations on mental illnesses, unemployment and suicide over the years. The Vizhub project of the Choropleth Map is the following:

- [Visualization of the people affected by mental illnesses over the years in all the world](https://vizhub.com/fmejias/85b1c6c793c046efa2b724027bcbb831)
[![image](https://user-images.githubusercontent.com/12739451/97125507-c86a2780-16f9-11eb-84d2-4e7e2800597f.png)](https://vizhub.com/fmejias/85b1c6c793c046efa2b724027bcbb831)

The Vizhub project of the Dashboard is the following:

- [Project Dashboard - Mental Illnesses, Unemployment and Suicides over the years](https://vizhub.com/fmejias/34c9ea7e0d9741a799fc6fcb802a7f55)
[![image](https://user-images.githubusercontent.com/12739451/97387143-0b173580-189b-11eb-8671-df298063e9b3.png)](https://vizhub.com/fmejias/34c9ea7e0d9741a799fc6fcb802a7f55)
