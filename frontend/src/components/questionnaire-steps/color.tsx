import * as React from "react";
import { external, inject } from "tsdi";
import { observer } from "mobx-react";
import { QuestionnaireService, Color } from "../../services/questionnaire";
import { Card } from "semantic-ui-react";

@observer
@external
export class ColorStep extends React.Component {
  @inject private readonly questionnaireService!: QuestionnaireService;

  private renderOption(option: Color): React.ReactNode {
    const isSelected =
      this.questionnaireService.choiceOfStep("color") === option;
    return (
      <Card
        key={option}
        raised={isSelected}
        header={option}
        description={isSelected ? "SELECTED" : "not selected"}
        onClick={() =>
          this.questionnaireService.choose(
            "color",
            isSelected ? undefined : option
          )
        }
      />
    );
  }

  public render(): React.ReactNode {
    const options = this.questionnaireService.optionsOfStep("color");
    if (!options) {
      return <p>Loading... placeholder</p>;
    }
    return <div>{options.map((option) => this.renderOption(option))}</div>;
  }
}
