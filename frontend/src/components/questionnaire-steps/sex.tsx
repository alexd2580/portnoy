import * as React from "react";
import { external, inject } from "tsdi";
import { observer } from "mobx-react";
import { QuestionnaireService } from "../../services/questionnaire";
import { Card, Icon } from "semantic-ui-react";

@observer
@external
export class SexStep extends React.Component {
  @inject private readonly questionnaireService!: QuestionnaireService;

  public render(): React.ReactNode {
    const options = this.questionnaireService.optionsOfStep("sex");
    if (!options) {
      return <p>Loading... placeholder</p>;
    }

    const selection = this.questionnaireService.choiceOfStep("sex");
    const maleSelected = selection === "male";
    const femaleSelected = selection === "female";
    return (
      <div>
        <Card
          key={"male"}
          raised={maleSelected}
          header={"male"}
          onClick={() =>
            this.questionnaireService.choose(
              "sex",
              maleSelected ? undefined : "male"
            )
          }
        >
          <Icon name="male" size="massive" />
        </Card>
        <Card
          key={"female"}
          raised={femaleSelected}
          header={"female"}
          onClick={() =>
            this.questionnaireService.choose(
              "sex",
              femaleSelected ? undefined : "female"
            )
          }
        >
          <Icon name="female" size="massive" />
        </Card>
      </div>
    );
  }
}
