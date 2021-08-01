import { component } from "tsdi";
import { action, makeObservable, observable } from "mobx";

export type Piece = "pants" | "t-shirt";
export type Sex = "male" | "female";
export type Size = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
export type Color = "red" | "green" | "blue" | "white" | "black";

interface QuestionnaireChoices {
  piece?: Piece;
  sex?: Sex;
  size?: Size;
  color?: Color;
}

/**
 * How to do this with mapped types?
 */
interface QuestionnaireOptions {
  piece: Piece[];
  sex: Sex[];
  size: Size[];
  color: Color[];
}

type QuestionnaireStep = keyof QuestionnaireChoices &
  keyof QuestionnaireOptions;

const QUESTIONNAIRE_STEPS: QuestionnaireStep[] = [
  "piece",
  "sex",
  "size",
  "color",
];

const wait = async (x: number) =>
  new Promise((resolve) => setTimeout(resolve, x));

@component
export class QuestionnaireService {
  constructor() {
    makeObservable(this);
  }

  @observable options?: QuestionnaireOptions;
  private loadingOptions: boolean = false;

  @observable choices: QuestionnaireChoices = {};

  @observable currentStepIndex: number = 0;

  public get currentStep(): QuestionnaireStep {
    return QUESTIONNAIRE_STEPS[this.currentStepIndex];
  }

  public choiceOfStep<Key extends QuestionnaireStep>(
    step: Key
  ): QuestionnaireChoices[Key] {
    return this.choices[step];
  }

  @action.bound private async loadOptions(): Promise<void> {
    // Call API with current choices.
    await wait(1000);
    this.options = {
      piece: ["pants", "t-shirt"],
      sex: ["male", "female"],
      size: ["xxs", "xs", "s", "m", "l", "xl", "xxl"],
      color: ["red", "green", "blue", "white", "black"],
    };
    this.loadingOptions = false;
  }

  public optionsOfStep<Key extends QuestionnaireStep>(
    step: Key
  ): QuestionnaireOptions[Key] | undefined {
    if (this.options !== undefined) {
      return this.options[step];
    }

    if (!this.loadingOptions) {
      this.loadingOptions = true;
      setTimeout(this.loadOptions.bind(this), 0);
    }
  }

  @action.bound public clear(): void {
    this.choices = {};
    this.currentStepIndex = 0;
  }

  @action.bound public goToStep(index: number): void {
    this.options = undefined;
    this.currentStepIndex = index;
  }

  public get hasNextStep(): boolean {
    return this.currentStepIndex !== QUESTIONNAIRE_STEPS.length - 1;
  }

  public goToNextStep(): void {
    if (this.hasNextStep) {
      this.goToStep(this.currentStepIndex + 1);
    }
  }

  public get hasPrevStep(): boolean {
    return this.currentStepIndex !== 0;
  }

  public goToPrevStep(): void {
    if (this.hasPrevStep) {
      this.goToStep(this.currentStepIndex - 1);
    }
  }

  @action.bound public choose<Key extends QuestionnaireStep>(
    key: Key,
    value: QuestionnaireChoices[Key]
  ): void {
    if (key !== this.currentStep) {
      return;
    }
    this.choices[key] = value;
  }
}
