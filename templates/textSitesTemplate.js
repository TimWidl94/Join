function legalNoticeH1Html() {
  return /*html*/ `
        <h1 class="h1textSites">Legal Notice</h1>
        <a href="./summary.html">
          <div class="arrowContainer" id="arrowContainer">
            <img
              src="./assets/img/icons/blueArrowLeft.svg"
              class="arrowLeftIconPrivacyPolicy"
              onClick="history.go(-1); return false;"
              id="arrowLeft"
            />
          </div>
        </a>
    `;
}

function legalNoticeHtmlMain() {
  return /*html*/ `
      <h2 class="h2-legal-notice">Imprint</h2>
      <ul>
        <li>Verena Schranz</li>
        <li>Tim Widl</li>
        <li>Christian Grund</li>
        <br />
        <p class="p-text-sites" class="p-text-sites">Musterstraße 01 <br /> 00000 Musterstadt</p>
      </ul>
      <h2 class="h2-legal-notice">Exploring the Board</h2>
      <p class="p-text-sites">
        Email:
        <a href="mailto:Join-Gruppe-9@mail.de">Join-Gruppe-9@mail.de</a>
      </p>
      <h2 class="h2-legal-notice">Acceptance of terms</h2>
      <p class="p-text-sites">
        By accessing and using <span class="span-blue">Join</span> (Product), you
        acknowledge and agree to the following terms and conditions, and any
        policies, guidelines, or amendments thereto that may be presented to you
        from time to time. We, the listed students, may update or change the
        terms and conditions from time to time without notice.
      </p>
      <h2 class="h2-legal-notice">Scope and ownership of the product</h2>
      <p class="p-text-sites">
        <span class="span-blue">Join</span> has been developed as part of a student
        group project in a web development bootcamp at the
        <span class="span-blue">Developer Akademie GmbH</span>. It has an educational
        purpose and is not intended for extensive personal & business usage. As
        such, we cannot guarantee consistent availability, reliability,
        accuracy, or any other aspect of quality regarding this Product.
        <br /><br />
        The design of <span class="span-blue">Join</span> is owned by the
        <span class="span-blue">Developer Akademie GmbH</span>. Unauthorized use,
        reproduction, modification, distribution, or replication of the design
        is strictly prohibited.
      </p>
      <h2 class="h2-legal-notice">Proprietary rights</h2>
      <p class="p-text-sites">
        Aside from the design owned by
        <span class="span-blue">Developer Akademie GmbH</span>, we, the listed
        students, retain all proprietary rights in
        <span class="span-blue">Join</span>, including any associated copyrighted
        material, trademarks, and other proprietary information.
      </p>
      <h2 class="h2-legal-notice">Use of the product</h2>
      <p class="p-text-sites">
        <span class="span-blue">Join</span> is intended to be used for lawful
        purposes only, in accordance with all applicable laws and regulations.
        Any use of <span class="span-blue">Join</span> for illegal activities, or to
        harass, harm, threaten, or intimidate another person, is strictly
        prohibited. You are solely responsible for your interactions with other
        users of <span class="span-blue">Join</span>.
      </p>
      <h2 class="h2-legal-notice">Disclaimer of warranties and limitation of liability</h2>
      <p class="p-text-sites">
        <span class="span-blue">Join</span> is provided "as is" without warranty of
        any kind, whether express or implied, including but not limited to the
        implied warranties of merchantability, fitness for a particular purpose,
        and non-infringement. In no event will we, the listed students, or the
        <span class="span-blue">Developer Akademie</span>, be liable for any direct,
        indirect, incidental, special, consequential or exemplary damages,
        including but not limited to, damages for loss of profits, goodwill,
        use, data, or other intangible losses, even if we have been advised of
        the possibility of such damages, arising out of or in connection with
        the use or performance of <span class="span-blue">Join</span>.
      </p>
      <h2 class="h2-legal-notice">Indemnity</h2>
      <p class="p-text-sites">
        You agree to indemnify, defend and hold harmless us, the listed
        students, the <span class="span-blue">Developer Akademie</span>, and our
        affiliates, partners, officers, directors, agents, and employees, from
        and against any claim, demand, loss, damage, cost, or liability
        (including reasonable legal fees) arising out of or relating to your use
        of <span class="span-blue">Join</span> and/or your breach of this Legal
        Notice. <br /><br />
        For any questions or notices, please contact us at
        <a href="mailto:Join-Gruppe-9@mail.de">Join-Gruppe-9@mail.de</a>.
        <br /><br />
        Date: February 1, 2024
      </p>
    </section>
      `;
}

function helpH1Html() {
  return /*html*/ `
      <h1 class="h1textSites">Help</h1>
      <a href="./summary.html">
        <div class="arrowContainer" id="arrowContainer">
          <img
            src="./assets/img/icons/blueArrowLeft.svg"
            class="arrowLeftIconPrivacyPolicy"
            onClick="history.go(-1); return false;"
            id="arrowLeft"
          />
        </div>
      </a>
  `;
}

function helpHtmlMain() {
  return /*html*/ `
      <p class="p-text-sites">Welcome to the help page for <span class="span-blue">Join</span>, your guide
        to using our kanban project management tool. Here, we'll provide an
        overview of what <span class="span-blue">Join</span>
        is, how it can benefit you, and how to use it.
      </p>
      <h2 class="h2-help">What is Join?</h2>
      <p class="p-text-sites">
        <span class="span-blue">Join</span> is a kanban-based project management tool
        designed and built by a group of dedicated students as part of their web
        development bootcamp at the Developer Akademie. <br /><br />
        Kanban, a Japanese term meaning "billboard", is a highly effective
        method to visualize work, limit work-in-progress, and maximize
        efficiency (or flow). <span class="span-blue">Join</span> leverages the
        principles of kanban to help users manage their tasks and projects in an
        intuitive, visual interface. <br /><br />
        It is important to note that <span class="span-blue">Join</span> is designed
        as an educational exercise and is not intended for extensive business
        usage. While we strive to ensure the best possible user experience, we
        cannot guarantee consistent availability, reliability, accuracy, or
        other aspects of quality regarding <span class="span-blue">Join</span>.

      <h2 class="h2-help">How to use it</h2>
      <p class="p-text-sites">Here is a step-by-step guide on how to use <span class="span-blue">Join</span>:</p>

      <h2 class="h2-help">1.Exploring the Board</h2>
      <p class="p-text-sites"
        >When you log in to <span class="span-blue">Join</span>, you'll find a default board. This board represents your project and contains four
        default lists: "To Do", "In Progress", “Await feedback” and "Done".</p
      >

      <h2 class="h2-help">2.Creating Contacts</h2>
      <p class="p-text-sites"
        >In <span class="span-blue">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New
        contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can
        interact with the tasks on the board.</p
      >

      <h2 class="h2-help">3. Adding Cards</h2>
      <p class="p-text-sites"
        >Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the
        "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task
        name, description, due date, assignees, etc.</p
      >

      <h2 class="h2-help">4.Moving Cards</h2>
      <p class="p-text-sites"
        >As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the
        card from one list to another.</p
      >

      <h2 class="h2-help">5. Deleting Cards</h2>
      <p class="p-text-sites"
        >Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will
        permanently remove it from the board. Please exercise caution when deleting cards, as this action is
        irreversible. Remember that using <span class="span-blue">Join</span> effectively requires consistent updates from you and your team to ensure
        the board reflects the current state of your project. Have more questions about <span class="span-blue">Join</span>? Feel free to contact us at
        [Your Contact Email]. We're here to help you! Enjoy using <span class="span-blue">Join</span>!</p
      >
  `;
}
