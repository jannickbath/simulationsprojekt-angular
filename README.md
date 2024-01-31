# Simulationsprojekt

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Installation

Repository klonen und in den `browser/` Ordner navigieren. Nach anschließendem Ausführen einer der folgenden Kommandos, sollte das Programm unter [localhost:5174](localhost:5174) erreichbar sein.

```bash
git clone https://gitlab.lupcom.de/jbath/simulationsprojekt-angular.git
cd simulationsprojekt-angular/dist/simulationsprojekt/browser
```

### PHP

Vorraussetzungen:
- PHP


```bash
php -S localhost:5174
```

### Python

Vorraussetzungen:
- Python

```bash
python3 -m http.server 5174
# oder
py -m http.server 5174
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## TODO

- Button for opening gameSetup and botSetup again
- Items

## Zufallsparameter

- Welcher Text gefetcht wird
- Welcher Bot gewinnen wird
- Wann welche items auftauchen *

## Eingabeparameter

- Bots hinzufügen (Name, Geschwindigkeit)
- Maximale Textlänge bestimmen
- Simulationsgeschwindigkeit anpassen
- Items platzieren *

## Fix

- Bots are harder for longer texts, because they wont care how long the text is, they just a have their percentage per tick.