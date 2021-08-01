import * as R from "ramda";
import * as React from "react";
import { external, inject } from "tsdi";
import { observer } from "mobx-react";
import { action, observable, makeObservable } from "mobx";
import { Button, Container, Header, Dimmer, Loader } from "semantic-ui-react";
import { QuestionnaireService } from "../services/questionnaire";
import { PieceStep } from "../components/questionnaire-steps/piece";
import { SexStep } from "../components/questionnaire-steps/sex";
import { ColorStep } from "../components/questionnaire-steps/color";
import { SizeStep } from "../components/questionnaire-steps/size";

import style from "./questionnaire.scss";

@observer
@external
export class Questionnaire extends React.Component {
  @inject private readonly questionnaireService!: QuestionnaireService;

  constructor(props: {}) {
    super(props);
    // makeObservable(this);
  }

  private renderProgress(): React.ReactNode {
    return <Header size="huge">{this.questionnaireService.currentStep}</Header>;
  }

  private renderStep(): NonNullable<React.ReactNode> {
    switch (this.questionnaireService.currentStep) {
      case "piece":
        return <PieceStep />;
      case "sex":
        return <SexStep />;
      case "size":
        return <SizeStep />;
      case "color":
        return <ColorStep />;
    }
  }

  private renderForwardButton(): React.ReactNode {
    if (!this.questionnaireService.hasNextStep) {
      return <Button onClick={() => alert("Done")}>Finish</Button>;
    }

    if (
      this.questionnaireService.choiceOfStep(
        this.questionnaireService.currentStep
      ) === undefined
    ) {
      return (
        <Button onClick={() => this.questionnaireService.goToNextStep()}>
          Skip
        </Button>
      );
    }

    return (
      <Button onClick={() => this.questionnaireService.goToNextStep()}>
        Next
      </Button>
    );
  }

  private renderButtons(): React.ReactNode {
    return (
      <>
        <Button
          disabled={!this.questionnaireService.hasPrevStep}
          onClick={() => this.questionnaireService.goToPrevStep()}
        >
          Back
        </Button>
        {this.renderForwardButton()}
      </>
    );
  }

  public render(): React.ReactNode {
    return (
      <Container className={style.container}>
        <div className={style.content}>
          <div className={style.content__header}>{this.renderProgress()}</div>
          <div className={style.content__body}>{this.renderStep()}</div>
          <div className={style.content__footer}>{this.renderButtons()}</div>
        </div>
      </Container>
    );
  }
}
