FROM python:3.10.1-alpine

# SET WORKSPACE
WORKDIR /app

# UPGRADE PIP
RUN pip install --upgrade pip

# INSTALL Pipenv
RUN pip install pipenv 

# COPY Pipfiles
COPY Pipfile .
COPY Pipfile.lock .

# INSTALL DEPENDENCIES
RUN pipenv install

# COPY ALL FILES
COPY . .

# INIT DATA
RUN pipenv run init_data

CMD ["pipenv","run","start"]