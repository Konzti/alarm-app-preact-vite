import { useState } from "preact/hooks"

import Alarms from "./components/alarms"
import Layout from "./components/layout"
import AddModal from "./components/modal"
import { AlarmsProvider } from "./context/alarmContext"
import EditModal from "./components/editModal"
import { useAlarms } from "./hooks/useAlarms"
import Dashboard from "./components/dashboard"

const App = () => {
  return (
    <AlarmsProvider>
      <Content />
    </AlarmsProvider>
  )
}

const Content = () => {
  const { selectedAlarm } = useAlarms()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)

  const modalIsOpen = showModal || showEditModal

  return (
    <Layout freeze={modalIsOpen}>
      {showModal ? <AddModal close={() => setShowModal(false)} /> : null}
      {showEditModal ? (
        <EditModal
          close={() => setShowEditModal(false)}
          alarm={selectedAlarm}
        />
      ) : null}
      <Dashboard />
      <Alarms
        openModal={() => setShowModal(true)}
        openEditModal={() => setShowEditModal(true)}
      />
    </Layout>
  )
}

export default App
