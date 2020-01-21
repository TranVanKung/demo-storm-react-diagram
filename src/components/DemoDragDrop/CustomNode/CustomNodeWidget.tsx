import * as React from "react";
import CustomNodeModel from "./CustomNodeModel";
import { PortWidget } from "storm-react-diagrams";
import { Input, Select, Spin, Table } from "antd";
import axios from "axios";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  },
  {
    key: "3",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  },
  {
    key: "4",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  }
];

const columns = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];

export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  size?: number;
}

export class CustomNodeWidget extends React.Component<
  CustomNodeWidgetProps,
  any
> {
  public static defaultProps: CustomNodeWidgetProps = {
    size: 150,
    node: null
  };

  constructor(props: CustomNodeWidgetProps) {
    super(props);
    this.state = {
      listCountry: [],
      isFetchingData: false,
      text: "",
      intentId: "",
      intentName: ""
    };
  }

  componentDidMount() {
    const {
      node: {
        extras: { countryName, countryCode }
      }
    } = this.props;

    this.setState({
      intentId: countryCode,
      intentName: countryName
    });
  }

  onSearchTimeout = null;

  onFetchData = searchText => {
    clearTimeout(this.onSearchTimeout);

    this.setState({
      isFetchingData: true
    });

    if (searchText !== "") {
      this.onSearchTimeout = setTimeout(() => {
        axios
          .get(
            `http://restcountries.eu/rest/v2/name/${searchText}?fields=name;numericCode`
          )
          .then(res => {
            this.setState({
              listCountry: (res && res.data) || []
            });
          });
      }, 1000);
    } else {
      clearTimeout(this.onSearchTimeout);

      this.setState({
        isFetchingData: false
      });
    }
  };

  setNodeExtraData = (intentId, intentName) => {
    const { node } = this.props;

    node.extras = {
      intentId,
      intentName
    };

    console.log("extras is", node);
  };

  onInputChange = event => {
    const { value } = event.target;

    this.setState({
      intentId: value
    });

    this.setNodeExtraData(value, "");
  };

  onSelectChange = (value, option) => {
    const { props } = option;
    this.setState({
      intentId: value,
      intentName: props.children
    });

    console.log("option is", option);
    this.setNodeExtraData(value, props.children);
  };

  render() {
    const { isFetchingData, listCountry, intentId } = this.state;

    return (
      <div
        className="diamond-node"
        style={{
          position: "relative",
          width: this.props.size,
          height: this.props.size,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: this.props.size / 2 - 8,
            left: -8
          }}
        >
          <PortWidget name="left" node={this.props.node} />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 10,
            left: this.props.size - 8,
            top: this.props.size / 2 - 8
          }}
        >
          <PortWidget name="right" node={this.props.node} />
        </div>

        <div
          style={{
            width: "100%"
          }}
        >
          <Select
            showSearch
            allowClear={true}
            mode="single"
            notFoundContent={isFetchingData ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.onFetchData}
            placeholder="Your nationality"
            style={{ marginBottom: "15px" }}
            onChange={this.onSelectChange}
          >
            {listCountry.length > 0 &&
              listCountry.map(data => (
                <Select.Option key={data.numericCode} value={data.numericCode}>
                  {data.name}
                </Select.Option>
              ))}
          </Select>
          <Input
            onChange={this.onInputChange}
            value={intentId}
            style={{ marginBottom: "30px" }}
          />
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 2 }}
          />
        </div>
      </div>
    );
  }
}
