import { configure } from "tsdi";

import { ApiService } from "./services/api";
import { QuestionnaireService } from "./services/questionnaire";

import { Questionnaire } from "./components/questionnaire";
import { PieceStep } from "./components/questionnaire-steps/piece";
import { SexStep } from "./components/questionnaire-steps/sex";
import { ColorStep } from "./components/questionnaire-steps/color";
import { SizeStep } from "./components/questionnaire-steps/size";

export class Application {
  @configure public readonly questionnaireService!: QuestionnaireService;

  @configure public readonly questionnaire!: Questionnaire;
  @configure public readonly pieceStep!: PieceStep;
  @configure public readonly sexStep!: SexStep;
  @configure public readonly colorStep!: ColorStep;
  @configure public readonly sizeStep!: SizeStep;
}
