# To do list

It is a to do list

## Instalation

First clone this repository

```
 $ git clone https://github.com/StheffanyHadlich/to-do-list.git
 $ cd to-do-list
```
Then install the dependencies

```
$ yarn
```
and now you can run the application with

```
$ yarn start
```

This app runs with an external rails API, you can visit it in ``` https://geru-to-do-list-api.herokuapp.com/``` its repository also can be found at ```https://github.com/StheffanyHadlich/to-do-list-api```

## API endpoints

These are the available endpoints for this aplication

`official client only` [/1/billing/retrieve-billing-data.json](#get-1billingretrieve-billing-datajson) <br/>

### GET

`tasks` [/tasks](https://geru-to-do-list-api.herokuapp.com/tasks) <br>
`tasks` [/tasks/:id_task](https://geru-to-do-list-api.herokuapp.com/tasks) <br><br>
`tags` [/tasks](https://geru-to-do-list-api.herokuapp.com/tags)

### POST

`tasks` [/tasks](https://geru-to-do-list-api.herokuapp.com/tasks) <br>

#### Parameters

| Name    | required    | Type   |
| --------| ------------|--------|
| `task`  | required    | Object |


### PATCH

`tasks` [/tasks/:id_task](https://geru-to-do-list-api.herokuapp.com/) <br>

#### Parameters

| Name    | required    | Type   |
| --------| ------------|--------|
| `task`  | required    | Object |

### DELETE

`tasks` [/tasks/:id_task](https://geru-to-do-list-api.herokuapp.com/) <br>


##Tests

Tests can be executed with

```
$ yarn test
```


____________________________



