import * as React from 'react';
import { PageContext } from '@microsoft/sp-page-context';

export default class MyWebPart extends React.Component<any, any> {
  private _pageContext: PageContext;

  constructor(props: any) {
    super(props);
    this._pageContext = this.props.pageContext;
  }

  public render(): React.ReactElement<any> {
    const sectionId = this._pageContext.sectionId;

    return (
      <div>
        Parent Section ID: {sectionId}
      </div>
    );
  }
}
