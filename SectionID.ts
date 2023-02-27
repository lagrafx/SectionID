import * as React from 'react';
import styles from './SectionIdWebPart.module.scss';
import { ISectionIdWebPartProps } from './ISectionIdWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { sp } from '@pnp/sp/presets/all';
import { PageContext } from '@microsoft/sp-page-context';
import { Text } from '@microsoft/sp-core-library';

export interface ISectionIdWebPartState {
  sectionId: string;
}

export default class SectionIdWebPart extends React.Component<ISectionIdWebPartProps, ISectionIdWebPartState> {

  constructor(props: ISectionIdWebPartProps) {
    super(props);
    this.state = {
      sectionId: ''
    };
  }

  public async componentDidMount() {
    if (Environment.type !== EnvironmentType.Local) {
      await sp.setup({
        spfxContext: this.props.context
      });

      let sectionId = '';
      const pageContext = this.props.context.pageContext;
      if (pageContext.list && pageContext.listItem && pageContext.listItem.Id && pageContext.sectionId) {
        sectionId = pageContext.sectionId;
      }
      this.setState({
        sectionId: sectionId
      });
    }
  }

  public render(): React.ReactElement<ISectionIdWebPartProps> {
    return (
      <div className={styles.sectionIdWebPart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Section ID:</span>
              <Text>{this.state.sectionId}</Text>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
