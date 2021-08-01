import * as React from "react";
import { external, inject } from "tsdi";
import { observer } from "mobx-react";
import { QuestionnaireService, Piece } from "../../services/questionnaire";
import { Card } from "semantic-ui-react";

@observer
@external
export class PieceStep extends React.Component {
  @inject private readonly questionnaireService!: QuestionnaireService;

  private renderOption(option: Piece): React.ReactNode {
    const isSelected =
      this.questionnaireService.choiceOfStep("piece") === option;
    return (
      <Card
        key={option}
        raised={isSelected}
        header={option}
        description={isSelected ? "SELECTED" : "not selected"}
        onClick={() =>
          this.questionnaireService.choose(
            "piece",
            isSelected ? undefined : option
          )
        }
      />
    );
  }

  public render(): React.ReactNode {
    const options = this.questionnaireService.optionsOfStep("piece");
    if (options) {
      return <div>{options.map((option) => this.renderOption(option))}</div>;
    }
    return <p>Loading... placeholder</p>;
  }
}
