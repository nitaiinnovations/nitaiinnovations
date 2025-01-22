import DataList from "../Components/DataList";
import { CloudQNA_1Data } from "./CloudQNA_1Data";
import { CloudQNA_2Data } from "./CloudQNA_2Data";
import { CloudQNA_3Data } from "./CloudQNA_3Data";

export const CloudServicesQNA = {
  title: "",
  description: "",
  items: [
    {
      title: `What are Cloud Computing Services and how can they benefit your
      business?`,
      description: <DataList data={CloudQNA_1Data} />,
    },
    {
      title: `What are the key components of Cloud Infrastructure and why are
      they important?`,
      description: <DataList data={CloudQNA_2Data} />,
    },
    {
      title: `What is Cloud Computing Integration and how does it work?`,
      description: <DataList data={CloudQNA_3Data} />,
    },
  ],
};
