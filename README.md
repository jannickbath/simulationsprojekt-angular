# Simulationsprojekt

## Installation

Repository klonen und in den `browser/` Ordner navigieren. Nach anschließendem Ausführen einer der folgenden Kommandos, sollte das Programm unter [localhost:4200](localhost:4200) erreichbar sein.

```bash
git clone https://github.com/jannickbath/simulationsprojekt-angular.git
cd simulationsprojekt-angular/dist/simulationsprojekt/browser
```

### PHP

Vorraussetzungen:
- PHP


```bash
php -S localhost:4200
```

### Python

Vorraussetzungen:
- Python

```bash
python3 -m http.server 4200
# oder
py -m http.server 4200
```

## Zufallsparameter

- Welcher Text von der API bezogen wird
  - Der Text wird zufällig vom [Quotable API-Endpunkt](https://api.quotable.io/quotes/random) bezogen
- Um wieviel cpm jeder Bot, jeden Tick von seinem baseSpeed abweicht
  - Zufällige Abweichung zwischen -50cpm und 50cpm
- Wann ein Barriere-Item auftaucht und wie hoch der Schaden ist
    - Desto weiter der Spieler oder die Bots vorangekommen sind, desto höher ist die Warscheinlichkeit, dass eine Barriere auftaucht.
    - Die CPM-Penalty für Bots wird zufällig zwischen -35 und -75 ausgewählt
    - Bei einem Spieler wird bei Kollision mit einer Barriere weiterer Text von der API geholt

    - Beispiele Warscheinlichkeit für eine Barriere bei Bots:
     - Progress: 25% -> 25 / 3 -> 8.3%
     - Progress: 50% -> 50 / 3 -> 16.67%
     - Progress: 80% -> 80 / 3 -> 26.67%

    - Beispiele Warscheinlichkeit für eine Barriere bei Spielern:
     - Progress: 25% -> 25 / 4 -> 6.25%
     - Progress: 50% -> 50 / 4 -> 12.5%
     - Progress: 80% -> 80 / 4 -> 20%

## Eingabeparameter

- Bots hinzufügen (Name, Geschwindigkeit)
- Maximale Textlänge bestimmen
- Simulationsgeschwindigkeit anpassen
- Eingabe von Text in der Textbox

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.