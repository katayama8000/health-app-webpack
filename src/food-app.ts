class Score {
  get totalScore() {
    const foods = Foods.getInstance();
    return foods.activeElementsScore.reduce((total, score) => total + score, 0);
  }

  render() {
    document.querySelector('.score__number')!.textContent = String(this.totalScore);
  }
}
class Food {
  constructor(public element: HTMLDivElement) {
    //.bindで
    element.addEventListener("click", this.clickEventHandler.bind(this));
  }

  clickEventHandler() {
    console.log(this);
    this.element.classList.toggle("food-active");
    const score = new Score();
    score.render()
  }
}
class Foods {
  private static instance: Foods;
  elements = document.querySelectorAll<HTMLDivElement>(".food");
  private _activeElements: HTMLDivElement[] = [];
  private _activeElementsScore: number[] = [];
  get activeElements() {
    this._activeElements = [];
    this.elements.forEach((element) => {
      if (element.classList.contains("food-active")) {
        this._activeElements.push(element);
      }
    });
    return this._activeElements;
  }

  get activeElementsScore() {
    this._activeElementsScore = [];
    this.activeElements.forEach((element) => {
      const foodScore = element.querySelector(".food__score");
      if (foodScore) {
        this._activeElementsScore.push(Number(foodScore.textContent));
      }
    });
    return this._activeElementsScore;
  }
  private constructor() {
    this.elements.forEach((element) => {
      //Foodのインスタンス化、引数element
      new Food(element);
    });
  }

  static getInstance() {
    if (!Foods.instance) {
      Foods.instance = new Foods();
    }
    return Foods.instance;
  }
}

//const foods = new Foods();
const foods = Foods.getInstance();
