import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetEmis } from '../../api/useEmi';
import BtnGroup from '../../components/button/BtnGroup';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Message from '../../components/message/Message';
import Modal from '../../components/modal/Modal';
import PageTitle from '../../components/pageTitle/PageTitle';
import Spinner from '../../components/spinner/Spinner';
import EmiCard from './EmiCard';
import EmiSummary from './EmiSummary';

function Emi() {
  const { isLoading, emis } = useGetEmis();
  const navigate = useNavigate();
  const [selectedEmiIds, setSelectedEmiIds] = useState([]);
  const [summaryModal, setSummaryModal] = useState(false);

  return (
    <>
      <Container>
        <PageTitle title='EMIs'>
          <BtnGroup>
            <Button
              disabled={selectedEmiIds?.length === 0}
              onClick={() => setSummaryModal(true)}
            >
              Summarize
            </Button>
            <Button variant='secondary' onClick={() => navigate('addEmi')}>
              Add EMI
            </Button>
          </BtnGroup>
        </PageTitle>

        {isLoading ? (
          <Spinner />
        ) : !emis?.length ? (
          <Message
            title='No EMI found'
            message='Click below to get started'
            buttonText='Add EMI'
            buttonAction={() => navigate('/montra/emi/addEmi')}
          />
        ) : (
          emis.map((emi) => (
            <EmiCard
              key={emi._id}
              emi={emi}
              selectedEmiIds={selectedEmiIds}
              setSelectedEmiIds={setSelectedEmiIds}
            />
          ))
        )}
      </Container>
      <Modal
        open={summaryModal}
        close={() => setSummaryModal(false)}
        title='EMI Summary'
        footerDisabled
      >
        <EmiSummary emis={emis} selectedEmiIds={selectedEmiIds} />
      </Modal>
    </>
  );
}

export default Emi;
