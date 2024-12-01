#[test_only]
module test_nft::professional_nft_tests {
    use sui::test_scenario;
    use std::string::utf8;
    use test_nft::professional_nft::{Self, ProfessionalNFT};

    const ADMIN: address = @0xA1;
    const USER: address = @0xB2;
    const CONTRACT: address = @0xC3;

    fun create_test_nft(scenario: &mut test_scenario::Scenario) {
        let ctx = test_scenario::ctx(scenario);
        professional_nft::init_for_testing(ctx);

        test_scenario::next_tx(scenario, ADMIN);
        let ctx = test_scenario::ctx(scenario);
        professional_nft::mint_professional_nft(
            utf8(b"Test NFT"),
            utf8(b"Test Description"),
            utf8(b"https://test.com/image.jpg"),
            utf8(b"https://github.com/test"),
            utf8(b"https://twitter.com/test"),
            CONTRACT,
            80,  // tech_score
            80,  // social_score
            USER,  // recipient
            ctx
        );
    }

    #[test]
    fun test_create_nft() {
        let mut scenario_val = test_scenario::begin(ADMIN);
        let scenario = &mut scenario_val;
        
        create_test_nft(scenario);

        test_scenario::next_tx(scenario, USER);
        {
            let nft = test_scenario::take_from_sender<ProfessionalNFT>(scenario);
            assert!(professional_nft::get_title(&nft) == utf8(b"Test NFT"), 0);
            assert!(professional_nft::get_description(&nft) == utf8(b"Test Description"), 1);
            assert!(professional_nft::get_tech_score(&nft) == 80, 2);
            assert!(professional_nft::get_social_score(&nft) == 80, 3);
            test_scenario::return_to_sender(scenario, nft);
        };

        test_scenario::end(scenario_val);
    }

    #[test]
    fun test_update_nft() {
        let mut scenario_val = test_scenario::begin(ADMIN);
        let scenario = &mut scenario_val;
        
        create_test_nft(scenario);

        test_scenario::next_tx(scenario, USER);
        {
            let mut nft = test_scenario::take_from_sender<ProfessionalNFT>(scenario);
            professional_nft::update_title(&mut nft, utf8(b"Updated Title"));
            professional_nft::update_description(&mut nft, utf8(b"Updated Description"));
            professional_nft::update_tech_score(&mut nft, 90);
            professional_nft::update_social_score(&mut nft, 90);
            
            assert!(professional_nft::get_title(&nft) == utf8(b"Updated Title"), 3);
            assert!(professional_nft::get_description(&nft) == utf8(b"Updated Description"), 4);
            assert!(professional_nft::get_tech_score(&nft) == 90, 5);
            assert!(professional_nft::get_social_score(&nft) == 90, 6);
            
            test_scenario::return_to_sender(scenario, nft);
        };

        test_scenario::end(scenario_val);
    }

    #[test]
    #[expected_failure(abort_code = 0, location = test_nft::professional_nft)]
    fun test_invalid_tech_score() {
        let mut scenario_val = test_scenario::begin(ADMIN);
        let scenario = &mut scenario_val;
        
        let ctx = test_scenario::ctx(scenario);
        professional_nft::init_for_testing(ctx);

        test_scenario::next_tx(scenario, ADMIN);
        {
            let ctx = test_scenario::ctx(scenario);
            professional_nft::mint_professional_nft(
                utf8(b"Test"),
                utf8(b"Test"),
                utf8(b"https://test.com/image.jpg"),
                utf8(b"https://github.com/test"),
                utf8(b"https://twitter.com/test"),
                CONTRACT,
                101,  // Invalid tech_score > 100
                80,   // social_score
                USER, // recipient
                ctx
            );
        };

        test_scenario::end(scenario_val);
    }

    #[test]
    fun test_burn_nft() {
        let mut scenario_val = test_scenario::begin(ADMIN);
        let scenario = &mut scenario_val;
        
        create_test_nft(scenario);

        test_scenario::next_tx(scenario, USER);
        {
            let nft = test_scenario::take_from_sender<ProfessionalNFT>(scenario);
            professional_nft::burn(nft);
        };

        test_scenario::end(scenario_val);
    }
}