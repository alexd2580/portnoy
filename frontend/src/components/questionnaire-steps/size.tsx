import * as React from "react";
import { external, inject } from "tsdi";
import { observer } from "mobx-react";
import { QuestionnaireService, Size } from "../../services/questionnaire";
import { Card, Icon } from "semantic-ui-react";
import { IconSizeProp } from "semantic-ui-react/dist/commonjs/elements/Icon/Icon";

@observer
@external
export class SizeStep extends React.Component {
  @inject private readonly questionnaireService!: QuestionnaireService;

  private sizeMapping: { [key in Size]: IconSizeProp } = {
    xxs: "mini",
    xs: "tiny",
    s: "small",
    m: "large",
    l: "big",
    xl: "huge",
    xxl: "massive",
  };

  private renderOption(option: Size): React.ReactNode {
    const isSelected =
      this.questionnaireService.choiceOfStep("size") === option;
    return (
      <Card
        key={option}
        raised={isSelected}
        onClick={() =>
          this.questionnaireService.choose(
            "size",
            isSelected ? undefined : option
          )
        }
      >
        <Icon name="sliders horizontal" size={this.sizeMapping[option]} />
      </Card>
    );
  }

  public render(): React.ReactNode {
    const options = this.questionnaireService.optionsOfStep("size");
    if (!options) {
      return <p>Loading... placeholder</p>;
    }

    return <div>{options.map((option) => this.renderOption(option))}</div>;
  }
}
