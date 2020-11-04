import styled from "styled-components";
import { useForm } from "react-hook-form";

function DeviceForm(props) {
  const { register, handleSubmit } = useForm();

  const options = [
    { value: 'LIGHT', label: 'Light' },
    { value: 'TV', label: 'TV' },
    { value: 'THERMOSTAT', label: 'Thermostat' },
    { value: 'SPEAKER', label: 'Speaker' },
    { value: 'CAMERA', label: 'Camera' },
  ]

  const onSubmit = (formData) => {
    props.onSubmit();
    props.onClose();
  }

  return (
    <Container>
      <Header>Add Device</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Name</Label>
        <Input type="text" name="deviceName" ref={register} required/>
        <Label>Type</Label>
        <Select name="deviceType" ref={register} required>
          {options.map((o, i) => (
            <option key={i} value={o.value}>{o.label}</option>
          ))}
        </Select>
        <Row>
          <Button style={{marginRight: '8px'}} type="submit">Submit</Button>
          <SecondaryButton style={{marginLeft: '8px'}} onClick={props.onClose}>Cancel</SecondaryButton>
        </Row>
      </form>
    </Container>
  );
}

export default DeviceForm;

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 275px;
  display: flex;
  flex-direction: column;
  background-color: #576175;
  padding: 2rem 3rem;
  border-radius: 10px;
`;

const Header = styled.span`
  font-size: 22pt;
  margin-bottom: 28px;
  color: white;
`;

const Label = styled.span`
  display: block;
  margin-bottom: 8px;
  color: white;
`;

const Input = styled.input`
  background-color: #C1CFDA;
  border: none;
  border-radius: 4px;
  color: #2B303A;
  padding: 11px;
  width: calc(100% - 22px);
  margin-bottom: 1rem;
  font-size: 12pt;

  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  background-color: #C1CFDA;
    border: none;
    border-radius: 4px;
    color: #2B303A;
    padding: 11px;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 12pt;

    &:focus {
      outline: none;
    }
`;

const Row = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #FF5D73;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
`;

const SecondaryButton = styled(Button)`
  background-color: #C1CFDA;
  color: #2B303A;
`;