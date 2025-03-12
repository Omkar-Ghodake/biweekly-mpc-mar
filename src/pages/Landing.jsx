import React, { useContext } from 'react'
import { ModalContext } from '../context/ModalProvider'
import Modal from '../layouts/Modal/Modal'
import ModalHead from '../layouts/Modal/ModalHead'
import ModalBody from '../layouts/Modal/ModalBody'

const Landing = () => {
  const { openModal } = useContext(ModalContext)

  return (
    <div>
      Landing
      <div>
        <button onClick={openModal}>Open Modal</button>
      </div>
      <Modal>
        <ModalHead>Modal Heading</ModalHead>

        <ModalBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          nostrum, natus animi beatae culpa doloremque consequuntur reiciendis
          quae blanditiis corrupti deleniti repellat veniam quidem sit modi quia
          est. Illo, earum!

        </ModalBody>
      </Modal>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
        praesentium, repellendus cupiditate illum maiores ut nemo eaque nesciunt
        quibusdam, odit consequuntur? Rerum esse nihil laborum temporibus, sit,
        atque veniam ab aperiam asperiores nisi dignissimos facilis unde,
        incidunt rem pariatur praesentium inventore iste possimus expedita!
        Minus a dicta itaque consectetur dolore aperiam, velit commodi omnis
        magni eaque atque tempora, modi suscipit perspiciatis! Aut placeat ullam
        nemo, exercitationem dignissimos sed eum animi quasi sit sint nulla
        cupiditate saepe voluptates eius necessitatibus quaerat voluptatum
        consectetur cumque alias quidem nihil eaque veritatis eos! Expedita
        voluptatibus doloribus architecto quae et quibusdam natus quis dolor
        atque. Accusamus modi debitis dolore ullam porro soluta omnis deserunt,
        dolor aliquid veniam, accusantium unde esse laudantium nihil ratione,
        perspiciatis optio voluptas. Molestiae quasi temporibus nostrum
        blanditiis ducimus eius doloribus placeat labore accusamus obcaecati,
        illum assumenda iure dolor architecto nobis quaerat atque id asperiores
        debitis harum veritatis fugit aspernatur praesentium modi? Architecto in
        quisquam, velit iusto eligendi quo, quae molestiae dolorum tenetur
        possimus blanditiis aperiam porro asperiores repellendus magni accusamus
        et consequuntur enim quis beatae non numquam totam? Sint alias
        aspernatur sunt nisi illum provident, possimus velit non amet? Assumenda
        dignissimos voluptatibus quod cumque veritatis in, illum asperiores
        pariatur blanditiis iusto doloribus harum laboriosam temporibus tenetur
        placeat dolore iure recusandae veniam neque dolor minus esse officiis.
        Ad sequi velit officiis similique alias soluta animi quaerat, natus
        laudantium quos placeat! Atque commodi, deleniti non dignissimos error
        ratione quam, autem sapiente rem consectetur inventore quod nemo nam qui
        recusandae, illum provident maiores nobis neque sunt quo. Fuga at totam,
        dolorum iure, non, aperiam reprehenderit sit voluptate adipisci
        laudantium aliquid reiciendis quasi a? Distinctio repellat sit nulla
        necessitatibus harum illo, dicta consectetur laborum saepe, inventore
        explicabo voluptatem labore quidem cumque at rem iusto atque et facere
        hic obcaecati, vel illum. Quaerat asperiores voluptas repudiandae quam.
        Culpa illo odio laborum ab fugit vero modi in pariatur! Iste recusandae
        illum temporibus et eum sequi nihil perferendis officia assumenda,
        necessitatibus dolor rem nam facere, mollitia alias. Sint, optio minus,
        laboriosam saepe ex provident dolorem asperiores magni at laborum est
        quo temporibus esse sit! Voluptatibus ullam at dolorum quae dolorem
        expedita quos veniam harum, excepturi sit aliquam nostrum adipisci odit
        hic modi. Ipsum tempora reprehenderit ratione voluptatum neque hic
        praesentium suscipit, aspernatur, odio, doloribus facilis? Nobis sit
        neque corrupti repellendus maxime recusandae? Exercitationem impedit
        laborum earum quasi autem veritatis quod itaque soluta tempora ea? Eum
        nostrum consequatur architecto rem velit? Voluptates aspernatur
        doloribus praesentium alias quod quis enim, sapiente ipsum, officia
        tempore impedit cupiditate, et ullam possimus doloremque. Fuga a illum
        dolorum provident iure porro recusandae accusantium blanditiis explicabo
        atque dolores quae adipisci necessitatibus nemo, error laudantium
        commodi harum molestiae qui, ducimus omnis. Nam eius maiores vel aperiam
        voluptates itaque deserunt architecto aliquid. Molestiae voluptate saepe
        nulla et, ducimus commodi possimus. Tempora voluptates soluta quia! Quis
        maiores eos totam consectetur reprehenderit possimus assumenda
        laudantium sapiente ab impedit quidem tempore optio dignissimos, nulla
        vitae iste libero qui quam officiis? Porro ipsum dolor tenetur soluta,
        rerum blanditiis minus itaque dicta.
      </div>
    </div>
  )
}

export default Landing
